const { data } = require("jquery");

/*
*Parse socket.io eventsource data to Set & Map for template usage
*Set:componentIDGroup(Set include data--id) & Map:componentIDMap(Map like: data--id => data--object)
*/
function parseServerEvent(IP, data, groupDataSet, groupDataMap, callback) {
    // componentIDGroup -> Object.Set is define in Object.name of addrGroupMap.get(IP)
    // componentIDMap -> Object.Map is define in Object.name of addrGroupMap.get(IP)
    let dataObj = JSON.parse(data); //component data object(use this as template raw data)
    let cId = dataObj.id; //component object id(use this to determine unique id)
    let cIdObj = {};
    cIdObj[cId] = { "live": "1", "ttl": "30" };//obj to describe attr of cId
    let cValue = dataObj.value; // not necessary
    let cName = dataObj.name; // not necessary

    groupDataSet.forEach((element) => {
        if (Object.keys(element).includes(cId)) {
            groupDataSet.delete(element);
        }
    });

    groupDataSet.add(cIdObj);

    groupDataMap.set(cId, dataObj);


    //console.log("addrGroupMap", addrGroupMap);
    //callback();

}

function updateTreeData(IP, groupDataSet, groupDataMap, callback) {
    let node = document.getElementById("treeview");
    let TreeviewNodeLists = node.querySelectorAll(`div[class*=TreeviewIPList]`);
    let TreeviewNodeListsIPSet = new Set();
    for (const items of TreeviewNodeLists) {
        const newItemsId = items?.id.replace(/_/g, "\.");
        TreeviewNodeListsIPSet.add(newItemsId);
    }
    let ObjStringSet = new Set();
    let componentNameGroupTreeview = new Set();
    for (const element of groupDataSet) {
        ObjStringSet.add(Object.keys(element)[0]);
    }

    if (!TreeviewNodeListsIPSet.has(IP)) {
        createTreeTemplate(IP, groupDataSet, groupDataMap, (fragment) => {
            node.appendChild(fragment);
            toggleTree(IP);
        })

    }
    else {
        for (const items of TreeviewNodeLists) {
            const newItemsId = items?.id.replace(/_/g, "\.");
            // <div id="10_0_0_190" class="TreeviewIPList"><span class="caret d-flex"><div class="mx-1 caret_IP">10.0.0.190</div></span><ul class="nested component_list"><li class="binary_sensor">binary_sensor-pir_sensor</li></ul></div>
            if (newItemsId == IP) {
                let componentListElement = items.getElementsByClassName("component_list");
                let componentDivElement = items.getElementsByClassName("component_div");
                let componentLabelElement = items.querySelectorAll("label[uniqueId]");
                for (const list of componentLabelElement) {
                    const NamedNodeMap = list.attributes;
                    const listAttr = NamedNodeMap["uniqueId"].value;
                    componentNameGroupTreeview.add(listAttr);
                }

                //Render component data（just add）
                for (const iterator of groupDataMap.entries()) {
                    const selector = iterator[0];
                    const data = JSON.stringify(iterator[1]);
                    if (!componentNameGroupTreeview.has(selector)) {
                        let entityClass = selector.slice(0, iterator[0].indexOf("-"));
                        let entityName = selector.slice(selector.indexOf("-") + 1);
                        let caretDiv = document.createElement("div");
                        caretDiv.classList.add("caret");
                        let divFlex = document.createElement("div");
                        divFlex.classList.add("d-flex");
                        let divFormCheck = document.createElement("div");
                        divFormCheck.classList.add(entityClass, "component_div", "form-check", "mx-2");
                        let input1 = document.createElement("input");
                        input1.classList.add("form-check-input");
                        input1.setAttribute("type", "checkbox");
                        let label1 = document.createElement("label");
                        label1.classList.add(entityClass, "component_label", "form-check-label");
                        label1.setAttribute("uniqueId", selector);
                        label1.textContent = entityName;
                        let badges = document.createElement("span");
                        let badgesNew = getEntityClassBadge(badges, entityClass);
                        label1.appendChild(badgesNew);
                        let dataElement = document.createElement("div");
                        //dataElement.textContent = data;
                        dataElement.setAttribute("entityName", selector);
                        dataElement.classList.add("nested", "dataElement", "mx-3");
                        label1.addEventListener("click", function () {
                            let thisP = this.parentElement;
                            let thisPP = this.parentElement.parentElement;
                            thisPP.nextElementSibling.classList.toggle("active");
                            thisP.previousElementSibling.classList.toggle("caret-down");
                        }
                        );
                        divFormCheck.append(input1, label1);
                        divFlex.append(caretDiv, divFormCheck);

                        componentListElement[0].append(divFlex, dataElement);
                    }
                }
                updateEntityData(items);
            }
        }
    }

    //Update entities data
    function updateEntityData(items) {
        let entityNameList = items.querySelectorAll("div[entityName]");
        function createEntityDatadiv(iterator, entityKey, entityValue) {
            let div0 = document.createElement("div");
            div0.classList.add("d-flex", "entityDataRegion", "ms-4");
            let div1Key = document.createElement("div");
            div1Key.classList.add("entityDataKey", "mx-2");
            div1Key.setAttribute("entityDataKey", entityKey);
            div1Key.textContent = entityKey + ":";
            let div1Value = document.createElement("div");
            div1Value.textContent = entityValue;
            div1Value.classList.add("entityDataValue", "mx-2");
            div0.append(div1Key, div1Value);
            iterator.appendChild(div0);
        }
        for (const iterator of entityNameList) {

            const originData = groupDataMap.get(iterator.getAttribute('entityName'));
            let treeviewEntityDataNodeList = iterator.getElementsByClassName("entityDataRegion");
            let treeviewEntityDataMap = new Map(); //Store treeview data map
            let entityKeyValueMap = new Map(); //Store origin data map
            for (const [entityKey, entityValue] of Object.entries(originData)) {
                entityKeyValueMap.set(entityKey, entityValue);
            }

            for (const node of treeviewEntityDataNodeList) {
                let nodeKey = node.getElementsByClassName("entityDataKey")[0];
                let nodeValue = node.getElementsByClassName("entityDataValue")[0];
                if (!treeviewEntityDataMap.has(nodeKey.getAttribute("entityDataKey"))) {
                    treeviewEntityDataMap.set(nodeKey.getAttribute("entityDataKey"), nodeValue.textContent);
                }
            }

            for (const element of entityKeyValueMap) {
                if (!treeviewEntityDataMap.has(element[0])) {
                    createEntityDatadiv(iterator, element[0], element[1]);
                }
            }
            for (const node of treeviewEntityDataNodeList) {
                let nodeKey = node.getElementsByClassName("entityDataKey")[0];
                let nodeValue = node.getElementsByClassName("entityDataValue")[0];
                if (entityKeyValueMap.has(nodeKey.getAttribute("entityDataKey"))) {
                    nodeValue.textContent = entityKeyValueMap.get(nodeKey.getAttribute("entityDataKey"));
                }

            }

        }
    }

    function getEntityClassBadge(badgesEle, entityClass) {
        let badgesText, bgColor;
        switch (entityClass) {
            case "sensor":
                badgesText = "Sensor";
                bgColor = "bg-primary";
                break;
            case "binary_sensor":
                badgesText = "Binary Sensor";
                bgColor = "bg-info";
                break;
            case "switch":
                badgesText = "Switch";
                bgColor = "bg-success";
                break;
            case "light":
                badgesText = "Light";
                bgColor = "bg-warning";
                break;
            case "fan":
                badgesText = "Fan";
                bgColor = "bg-danger";
                break;
            case "cover":
                badgesText = "Cover";
                bgColor = "bg-secondary";
                break;
            case "select":
                badgesText = "Select";
                bgColor = "bg-secondary";
                break;
            case "button":
                badgesText = "Button";
                bgColor = "bg-secondary";
                break;
            case "number":
                badgesText = "Number";
                bgColor = "bg-secondary";
                break;
            default:
                badgesText = "Unknown";
                bgColor = "bg-secondary";
                break;
        }
        badgesEle.classList.add("badge", bgColor, "mx-2");
        badgesEle.textContent = badgesText;
        return badgesEle;

    }
}







/*
*Create tree template HTML which is maped like data--id => data
*callback to map data in && append to index.html `Devices list` page
 
*------
*Treeview structure:
 
*div0.TreeviewIPList
    *input1.caret.d-flex
        *div1.mx-1.caret_IP  (IP)
    *ul1.nested.component_list
        *div2.
            li.`element_text.split('-')[0];`
            div3.data
        *...
        *...
        *...
    
*------
*/
function createTreeTemplate(IP, groupDataSet, groupDataMap, callback) {
    //let node = document.querySelector("#treeview");
    //const tree = new tree_structure(IP,componentNameGroup,componentDataMap);
    const fragment = new DocumentFragment();
    //componentNameGroup = groupDataSet;
    let div0 = document.createElement("div");
    div0.id = IP.replace(/\./g, "_");
    div0.classList.add("TreeviewIPList");
    let caretDiv = document.createElement("div");
    caretDiv.classList.add("caret");
    let input1 = document.createElement("input");
    input1.className = "form-check-input";
    input1.setAttribute("type", "checkbox");
    input1.id = IP.replace(/\./g, "_") + "-" + "input1";
    let div1 = document.createElement("div");
    div1.className = "mx-2 caret_IP";
    //div1.textContent = IP;
    div1.classList.add("form-check");
    label1 = document.createElement("label");
    label1.classList.add("form-check-label");
    //label1.setAttribute("for",input1.id);
    label1.textContent = IP;
    div1.append(input1, label1);
    let divFlex = document.createElement("div");
    divFlex.classList.add("d-flex");
    divFlex.append(caretDiv, div1);

    let ul1 = document.createElement("ul");
    ul1.className = "nested component_list mx-3";
    div0.append(divFlex, ul1);
    fragment.appendChild(div0);

    callback(fragment);

}

/*
*Expand treeview list
*/
function toggleTree(IP) {
    let t = document.getElementsByClassName("TreeviewIPList");
    IPid = IP.replace(/\./g, "_");
    for (const toggler of t) {
        if (toggler.id == IPid) {

            toggler.querySelector("label.form-check-label").addEventListener("click", function () {
                toggler.getElementsByClassName("caret")[0].classList.toggle("caret-down");
                toggler.getElementsByClassName("nested")[0].classList.toggle("active");
            })
        }
    }
}


function Remove_Tree_Template(id, data, callback) {

}

/*
*Operate exist Set(componentIDGroup) and Map(componentIDMap)
*/
function operateTreedata(id, data, operation, callback) {
    if (operation === "add") {
        Append_Tree_Template();
    }
    if (operation === "remove") {

    }
    if (operation === "update") {

    }
}



