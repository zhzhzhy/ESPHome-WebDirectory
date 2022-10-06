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
      const ip_regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
      if((typeof data === 'string' || data instanceof String) && ip_regex.test(data)){
      const Data_Append = $("<li/>").attr("id",data).addClass("component list-group-item row").html(`${data}`);
      //console.log(data_append);
      $("ul.component").append(Data_Append);
      }else{
          alert(`IP address invalid: ${data}`);
      }
}

function Remove_Component(){
  
      $("ul.component").on('dblclick',"li",function() {console.log("Remove component: ",$(this).text());$(this).remove();})

}