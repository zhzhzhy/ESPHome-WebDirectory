function Handle_Input_IP(callback) {
    let Input_IP;
    function handle_event(){
      Input_IP =  document.getElementById('IP_address');
    if(!Input_IP?.value){
      alert("Empty IP address!");
    }else{ 
    console.log(Input_IP.value);
    callback(Input_IP?.value);
    }
    }

    $("#Input_IP").click(function(){
      handle_event();
  });

  $("#IP_address").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handle_event();

    }
});
  
}

function Add_Component(data){

      $("ul.component").append(`<li class='component' id='${data}'>${data}</li>`);

}

function Remove_Component(){
  
      $("ul.component").on('dblclick',"li",function() {console.log("Remove component: ",$(this).text());$(this).remove();})

}