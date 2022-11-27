//class component {
    //constructor(IP,ID_Group,ID_Map) {
        //this.IP = IP;
        //this.ID_Group = ID_Group;
        //this.ID_Map = ID_Map;
    //}
//}
/*
Parse socket.io eventsource data to Set & Map for template usage
Set:Component_ID_Group(Set include data--id) & Map:componentIDMap(Map like: data--id => data--object)
*/
function parseServerEvent(IP,data,callback) {
    // Component_ID_Group -> Object.Set is define in Object.name of addrGroupMap.get(IP)
    // componentIDMap -> Object.Map is define in Object.name of addrGroupMap.get(IP)
    let data_obj = JSON.parse(data); //component data object(use this as template raw data)
    let c_id = data_obj.id; //component object id(use this to determine unique id)
    let c_id_obj = {};
    c_id_obj[c_id] = {"live":"1","ttl":"30"};//obj to describe attr of c_id
    console.log(c_id_obj);
    let c_value = data_obj.value; // not necessary
    let c_name = data_obj.name; // not necessary
    if (!addrGroupMap.has(IP)) {
        let Component_ID_Group = new Set();
        let componentIDMap = new Map();
        addrGroupMap.set(IP,{Component_ID_Group,componentIDMap});
    }
    let group_data_set = addrGroupMap.get(IP).Component_ID_Group;
    let group_data_map = addrGroupMap.get(IP).componentIDMap;
    group_data_set.forEach((element) => {
        if (Object.keys(element).includes(c_id)) {
            group_data_set.delete(element);
        }
    });

        group_data_set.add(c_id_obj);
   // if (!group_data_set.has(c_id)) {
   //     
   //     group_data_set.add(c_id);
   // }
    group_data_map.set(c_id,data_obj);
    
    console.log(data_obj.id);  //comment later!
    console.log("Component_ID_Group: ",group_data_set); //comment later!
    console.log("componentIDMap",group_data_map); //comment later!
    console.log(addrGroupMap);
    callback(group_data_set,group_data_map);
}

function updateTreeData(callback) {
    
}

/*
Create tree template HTML which is maped like data--id => data
callback to map data in && append to index.html `Devices list` page

------
Treeview structure:

div0.TreeviewIPList
    span1.caret.d-flex
        div1.mx-1.caret_IP  (IP)
    ul1.nested.component_list
        li2.`element_text.split('-')[0];`
        ...
        ...
        ...
    
------
*/
function createTreeTemplate(IP,component_name_group,component_data_map,callback){
    //let node = document.querySelector("#treeview");
    //const tree = new tree_structure(IP,component_name_group,component_data_map);
    const fragment = new DocumentFragment();
    let div0 = document.createElement("div");
    div0.id = IP.replace(/\./g,"_");
    div0.className = "TreeviewIPList";
    let span1 = document.createElement("span");
    span1.className = "caret d-flex";
    let div1 = document.createElement("div");
    div1.className = "mx-1 caret_IP";
    div1.textContent = IP;
    fragment.appendChild(div0).appendChild(span1).appendChild(div1);
    let ul1 = document.createElement("ul");
    ul1.className = "nested component_list";
    let ul_list = fragment.querySelector("div").appendChild(ul1);
    //console.log(ul_list);
    component_name_group.forEach(element => {
          let element_text = Object.keys(element)[0];
          let li2 = document.createElement("li");
          li2.className = element_text.split('-')[0];
          li2.textContent = element_text;
          ul_list.appendChild(li2); 
          componentIDGroupTreeview.add(element);
          }); 
    callback(fragment);

}

function Remove_Tree_Template(id,data,callback){
    
}

/*
Operate exist Set(Component_ID_Group) and Map(componentIDMap)
*/
function operateTreedata(id,data,operation,callback){
    if(operation === "add"){
        Append_Tree_Template();
    }
    if(operation === "remove"){

    }
    if(operation === "update"){

    }
}

function createTreeElement(group_map,callback) {


//    for(i of group_map.entries()){

//      div1.textContent = i[0];

//      const component_group = i[1].Component_ID_Group;
//      const component_map = i[1].componentIDMap;
//      component_group.forEach(element => {
//        if (!componentIDGroupTreeview.has(element)) {
//          all_node.querySelector(".component_list").appendChild(document.createElement('li')).textContent = element; 
//          componentIDGroupTreeview.add(element);
//        }
//          });
        
//      }
  
  }

  /*
Expand treeview list
*/
function toggleTree() {
    let toggler = document.getElementsByClassName("caret");
    let i;
    console.log(toggler); 
    for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
  }
  