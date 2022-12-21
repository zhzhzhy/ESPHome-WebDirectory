/*
*include in index.html 
*handle page event 
*/


/*
*Bootstrap alert syntax
*Define a new alert using bootstrap alert class
*/
const alertBS = (message, type, alertPlaceholder) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.after(wrapper);

  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance('.alert');
    alert.close();
  }, 4000);

}



// handle IP input 
function handleInputIP(callback) {
  let inputIP;
  function handleEvent() {
    inputIP = document.getElementById('ipAddress');
    if (!inputIP?.value) {
      alertBS("Empty IP address!", "danger", document.getElementById("IP_input_box"));
    } else {
      console.log("IP addr & component added: ", inputIP.value);
      callback(inputIP?.value);
    }
  }

  document.getElementById("basic-Commit-IP").addEventListener("click", function () {
    handleEvent();
  })

  document.getElementById("ipAddress").addEventListener("keypress", (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleEvent();
    }
  });


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
        alertBS(`Duplicated IP address: ${params}`, "danger", document.getElementById("IP_input_box"));
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



