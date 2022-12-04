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


    console.log("addrGroupMap", addrGroupMap);
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
            toggleTree();
        })

    }
    else {
        for (const items of TreeviewNodeLists) {
            const newItemsId = items?.id.replace(/_/g, "\.");
            // <div id="10_0_0_190" class="TreeviewIPList"><span class="caret d-flex"><div class="mx-1 caret_IP">10.0.0.190</div></span><ul class="nested component_list"><li class="binary_sensor">binary_sensor-pir_sensor</li></ul></div>
            if (newItemsId == IP) {
                let componentListElement = items.getElementsByClassName("component_list");
                let componentDivElement = items.getElementsByClassName("component_div");
                let componentLiElement = items.getElementsByClassName("component_li");
                let entityNameList = items.querySelectorAll("div[entityName]");
                for (const list of componentLiElement) {
                    const listText = list.textContent;
                    componentNameGroupTreeview.add(listText);
                }

                //Render component data
                for (const iterator of groupDataMap.entries()) {
                    const selector = iterator[0];
                    const data = JSON.stringify(iterator[1]);
                    if (!componentNameGroupTreeview.has(selector)) {
                        let div1 = document.createElement("div");
                        div1.classList.add(iterator[0].split('-')[0], "component_div");
                        let li2 = document.createElement("li");
                        li2.classList.add(iterator[0].split('-')[0], "component_li", "caret");
                        li2.textContent = iterator[0];
                        let dataElement = document.createElement("div");
                        dataElement.textContent = data;
                        dataElement.setAttribute("entityName", iterator[0]);
                        dataElement.classList.add("nested", "dataElement");
                        li2.addEventListener("click", function () {
                            this.parentElement.getElementsByClassName("nested")[0].classList.toggle("active");
                            this.classList.toggle("caret-down");
                        }
                        );
                        div1.appendChild(dataElement);
                        div1.prepend(li2);
                        componentListElement[0].appendChild(div1);
                    }
                }

                for (const iterator of entityNameList) {

                    const data = groupDataMap.get(iterator.getAttribute('entityName'));
                    iterator.textContent = JSON.stringify(data);
                }
            }
        }
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
    componentNameGroup = groupDataSet;
    let div0 = document.createElement("div");
    div0.id = IP.replace(/\./g, "_");
    div0.classList.add("TreeviewIPList");
    let caretDiv = document.createElement("div");
    caretDiv.classList.add("caret");
    let input1 = document.createElement("input");
    input1.className = "d-flex form-check-input";
    input1.setAttribute("type", "checkbox");
    input1.id = IP.replace(/\./g, "_") + "-" + "input1";
    let div1 = document.createElement("div");
    div1.className = "mx-1 caret_IP";
    //div1.textContent = IP;
    div1.classList.add("form-check");
    label1 = document.createElement("label");
    label1.classList.add("form-check-label");
    label1.setAttribute("for",input1.id);
    label1.textContent = IP;
    div1.append(input1,label1);
    let divFlex = document.createElement("div");
    divFlex.classList.add("d-flex");
    divFlex.append(caretDiv,div1);
    
    let ul1 = document.createElement("ul");
    ul1.className = "nested component_list";
    div0.append(divFlex,ul1);
    fragment.appendChild(div0); 

    callback(fragment);

}

/*
*Expand treeview list
*/
function toggleTree() {
    let t = document.getElementsByClassName("TreeviewIPList");
    for (const toggler of t) {
        toggler.querySelector("label.form-check-label").addEventListener("click",() => {
            console.log("this1:",this);
            toggler.getElementsByClassName("caret")[0].classList.toggle("caret-down");
            toggler.getElementsByClassName("nested")[0].classList.toggle("active");
        }) 
        // toggler.addEventListener("click", () => {
        //     console.log("this2:",this);
        //     this.getElementsByClassName("nested")[0].classList.toggle("active");
        // }
        // );
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

function createTreeElement(group_map, callback) {


    //    for(i of group_map.entries()){

    //      div1.textContent = i[0];

    //      const component_group = i[1].componentIDGroup;
    //      const component_map = i[1].componentIDMap;
    //      component_group.forEach(element => {
    //        if (!componentIDGroupTreeview.has(element)) {
    //          all_node.querySelector(".component_list").appendChild(document.createElement('li')).textContent = element; 
    //          componentIDGroupTreeview.add(element);
    //        }
    //          });

    //      }

}

