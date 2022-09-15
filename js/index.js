
    async function doRequest() {
        let url = 'http://10.0.0.127/events';
        let res = await fetch(url);

        if (res.ok) {

            let text = await res.text();
            console.log(text);
            return text;
        } else {
            return `HTTP error: ${res.status}`;
        }
    }

function htmlToText(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}

   // doRequest().then(data => {
   //     console.log(data);
  //      document.getElementById("test_url").innerHTML += data.text;
  //  });


    
const evtSource = new EventSource('http://10.0.0.127/events');
const eventList = document.querySelector('ul');

evtSource.onmessage = (e) => {
  const newElement = document.createElement("li");
  
  newElement.textContent = `message: ${e.data}`;
  eventList.appendChild(newElement);
  document.getElementById("test_url").innerHTML = e.data;
  console.log(e.data);
}

