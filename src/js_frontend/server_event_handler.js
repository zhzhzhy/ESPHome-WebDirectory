function Parse_Server_Event(id,data,callback) {
    
}

function Update_Tree_Data(id,data,callback) {
    
}

function Append_Tree_Template(id,data,callback){
    //let component_id_group = new Set();
    //console.log(JSON.parse(data));
    //let data_obj = {};
    let data_obj = JSON.parse(data);
    console.log(data_obj.id);
    let c_id = data_obj.id.split('-');
    let c_value = data_obj.value;
    let c_name = data_obj.name;
    component_id_group.add(c_id[1]);
    console.log(component_id_group);
    let template_tree = ``;

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