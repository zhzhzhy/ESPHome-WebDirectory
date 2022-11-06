class component {
    constructor(IP,ID_Group,ID_Map) {
        this.IP = IP;
        this.ID_Group = ID_Group;
        this.ID_Map = ID_Map;
    }
}
/*
Parse socket.io eventsource data to Set & Map for template usage
Set:Component_ID_Group(Set include data--id) & Map:Component_ID_Map(Map like: data--id => data--object)
*/
function Parse_Server_Event(IP,data,callback) {
    // Component_ID_Group -> Object.Set is define global scope or in closer
    // Component_ID_Map -> Object.Map is define global scope or in closer
    let data_obj = JSON.parse(data); //component data object(use this as template raw data)
    let c_id = data_obj.id; //component object id(use this to determine unique id)
    let c_value = data_obj.value; // not necessary
    let c_name = data_obj.name; // not necessary
    if (!Component_ID_Group.has(c_id)) {
        Component_ID_Group.add(c_id);
    }
        Component_ID_Map.set(c_id,data_obj);
    
    console.log(data_obj.id);  //comment later!
    console.log(Component_ID_Group); //comment later!
    console.log(Component_ID_Map); //comment later!
    callback(Component_ID_Group,Component_ID_Map);
}

function Update_Tree_Data(id,data,callback) {
    
}

/*
Create tree template HTML which is maped like data--id => data
callback to map data in && append to index.html `Devices list` page
*/
function Create_Tree_Template(IP,component_name_group,component_data_map,callback){
    let node = document.querySelector("#treeview");
    const fragment = new DocumentFragment();
    let li1 = document.createElement("li");
    li1.id = IP;
    let span1 = document.createElement("span");
    span1.className = "caret d-flex";
    let div1 = document.createElement("div");
    div1.className = "mx-1 caret_IP";
    div1.textContent = IP;
    fragment.appendChild(li1).appendChild(span1).appendChild(div1);
    ul = document.createElement("ul");
    ul.className = "nested component_list";
    fragment.querySelector(".li").appendChild(ul);
    console.log("fragment: ",fragment);
    component_name_group.forEach(element => {
        if (!Component_ID_Group_Treeview.has(element)) {
          all_node.querySelector(".component_list").appendChild(document.createElement('li')).textContent = element; 
          Component_ID_Group_Treeview.add(element);
        }
          }); 
    
    //let template_tree = ``; //write HTML template fro bootstrap tree-view

}

function Remove_Tree_Template(id,data,callback){
    
}

/*
Operate exist Set(Component_ID_Group) and Map(Component_ID_Map)
*/
function Operate_Tree_data(id,data,operation,callback){
    if(operation === "add"){
        Append_Tree_Template();
    }
    if(operation === "remove"){

    }
    if(operation === "update"){

    }
}

function Create_Tree_Element(group_map,callback) {


    for(i of group_map.entries()){

      div1.textContent = i[0];

      const component_group = i[1].Component_ID_Group;
      const component_map = i[1].Component_ID_Map;
      component_group.forEach(element => {
        if (!Component_ID_Group_Treeview.has(element)) {
          all_node.querySelector(".component_list").appendChild(document.createElement('li')).textContent = element; 
          Component_ID_Group_Treeview.add(element);
        }
          });
        
      }
  
  }