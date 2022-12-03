/*
*include in index.html 
*handle page event 
*/


/*
*Bootstrap alert syntax
*Define a new alert using bootstrap alert class
*/
const alertBS = (message, type, alertPlaceholder) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.after(wrapper);
  $(".alert").delay(4000).slideUp(200, function () {
    $(this).alert('close');
  });
}

/* 
*append template HTML in the text/template section of <script> tag
*/
function appendTemplate(selector, items) {
  var itemTpl = $('script[data-template="template_card"]').text().split(/\$\{(.+?)\}/g);
  function render(props) {
    return function (tok, i) {
      return (i % 2) ? props[tok] : tok;
    };
  }
  let aped = items.map(function (item) {
    return itemTpl.map(render(item)).join('');
  });
  selector.prepend(aped);
}

// handle IP input to addComponentCard
function handleInputIP(callback) {
  let inputIP;
  function handleEvent() {
    inputIP = document.getElementById('ipAddress');
    if (!inputIP?.value) {
      alertBS("Empty IP address!", "danger", $("#IP_input_box"));
    } else {
      console.log("IP addr & component added: ", inputIP.value);
      callback(inputIP?.value);
    }
  }

  $("#basic-Commit-IP").click(function () {
    handleEvent();
  });

  $("#ipAddress").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleEvent();

    }
  });

}

//Old addComponent function deprecated 
function addComponent(data, jqueryObject) {
  const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
  if ((typeof data === 'string' || data instanceof String) && ipRegex.test(data)) {
    let dataAppend = jqueryObject.attr("id", data);
    $("#device_list").prepend(dataAppend);
    const id = data.replace(/\./g, "\\.");
    const selectorH5 = '#' + id + ' ' + 'h5.card-title';
    $(selectorH5).html(`${data}`);
  } else {
    alertBS(`IP address invalid: ${data}`, "danger", $("#IP_input_box"));
  }
}

/*
*Add Component_Card :
*data as IP(text in the input box)
*selector as where to prepend()
*/
function addComponentCard(data, selector) {
  const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
  if ((typeof data === 'string' || data instanceof String) && ipRegex.test(data)) {
    let ipAddrSelector = data.replace(/\./g, "_");
    ipAddrSelector = "id_" + ipAddrSelector;
    let ipAddr = data;
    let items = [{
      id: `${data}`,
      ipAddr: `${ipAddr}`,
      ipAddr_sel: `${ipAddrSelector}`
    }];
    appendTemplate(selector, items);
  } else {
    alertBS(`IP address invalid: ${data}`, "danger", $("#IP_input_box"));
  }
}

/*
*Remove card
*/
function removeComponent() {
  $("div.component").on('click', "button.remove", function () {
    console.log("Remove component: ", $(this).parents("div.component")); $(this).parents("div.component").remove();
  })
}

/* 
*Maintain a group of added components IP address
*/
function maintainAddrGroup(params, Operation, callback) {
  try {
    if (Operation === "add") {
      if (!addrGroup.has(params)) {
        addrGroup.add(params);
        console.log("New components group set: ", [...addrGroup].map(data => `\[${data}\]`).join(","));
        callback();
      } else {
        alertBS(`Duplicated IP address: ${params}`, "danger", $("#IP_input_box"));
      }
    }
    if (Operation === "delete" | Operation === "remove") {
      console.log("New components group set: ", [...addrGroup].map(data => `\[${data}\]`).join(","))
      //Remove CODES HERE TODO
    }
  } catch (error) {
    console.log(error)
  }

}



