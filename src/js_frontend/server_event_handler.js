function Parse_Server_Event(id,data,callback) {
    //let Component_ID_Group = new Set();
    //console.log(JSON.parse(data));
    //let data_obj = {};
    let data_obj = JSON.parse(data); //component data object(use this as template raw data)
    console.log(data_obj.id);
    let c_id = data_obj.id; //component object id(use this to determine unique id)
    let c_value = data_obj.value; // not necessary
    let c_name = data_obj.name; // not necessary
    if (!Component_ID_Group.has(c_id)) {
        Component_ID_Group.add(c_id);
    }
    if (!Component_ID_Map.has(c_id)) {
        Component_ID_Map.set(c_id,data_obj);
    }
    console.log(Component_ID_Group);
    console.log(Component_ID_Map);
}

function Update_Tree_Data(id,data,callback) {
    
}

function Append_Tree_Template(id,data,callback){
   
    //let template_tree = ``; //write HTML template fro bootstrap tree-view

}

function Remove_Tree_Template(id,data,callback){
    
}

function Operate_Tree_data(id,data,operation,callback){
    if(operation === "add"){
        Append_Tree_Template();
    }
    if(operation === "remove"){

    }
    if(operation === "update"){

    }
}