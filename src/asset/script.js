const alert_BS = (message, type,alertPlaceholder) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.after(wrapper);
  $(".alert").delay(4000).slideUp(200,function() {
    $(this).alert('close');
});
}



function Append_Template(selector,items) {
  var itemTpl = $('script[data-template="template_card"]').text().split(/\$\{(.+?)\}/g);
  function render(props) {
    return function(tok, i) {
      return (i % 2) ? props[tok] : tok;
    };
  }
  let aped = items.map(function(item) {
    return itemTpl.map(render(item)).join('');
  });
  selector.prepend(aped);
}


function Handle_Input_IP(callback) {
    let Input_IP;
    function handle_event(){
      Input_IP =  document.getElementById('IP_address');
    if(!Input_IP?.value){
      alert_BS("Empty IP address!","danger",$("#IP_input_box"));
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

//Old Add_Component function deprecated 
function Add_Component(data,Jquery_Object){
      const ip_regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
      if((typeof data === 'string' || data instanceof String) && ip_regex.test(data)){
      let Data_Append = Jquery_Object.attr("id",data);
      $("#device_list").prepend(Data_Append);
      const id = data.replace(/\./g,"\\.");
      const selector_h5 = '#' + id + ' ' + 'h5.card-title';
      $(selector_h5).html(`${data}`);
      }else{
        alert_BS(`IP address invalid: ${data}`,"danger",$("#IP_input_box"));
      }
}

function Add_Component_Card(data,selector){
  const ip_regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
  if((typeof data === 'string' || data instanceof String) && ip_regex.test(data)){
    let ip_addr_selector = data.replace(/\./g,"_");
    ip_addr_selector = "id_" + ip_addr_selector;
    let ip_addr = data;
    let items = [{
        id: `${data}`,
        ip_addr: `${ip_addr}`,
        ip_addr_sel: `${ip_addr_selector}`
      }];
    Append_Template(selector,items); 
  }else{
    alert_BS(`IP address invalid: ${data}`,"danger",$("#IP_input_box"));
  }
}

function Remove_Component(selector){
  selector.on('click')
}

//function Remove_Component(){
//  
//      $("ul.component").on('dblclick',"div.component",function() {console.log("Remove component: ",$(this).text());$(this).remove();})
//
//}