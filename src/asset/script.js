function Handle_Input_IP(callback) {
    let Input_IP;
      $("#Input_IP").click(function(){
    Input_IP =  document.getElementById('IP_address');
    if(!Input_IP?.value){
      alert("Empty IP address!");
    }else{ 
    console.log(Input_IP.value);
    callback(Input_IP?.value);
    }
  });
  
}

function Add_Component(data){

      $("ul.component").append("<li class='component'>" + data + "</li>");

}

function Remove_Component(){
$("ul.component").on('dblclick',"li",function() {console.log("Remove component: ",$(this).text());$(this).remove();})
}