import fetch from 'node-fetch';
import EventSource from 'eventsource';
//const EventSource = require('eventsource');

    async function doRequest() {
        let url = 'http://10.0.0.127/events';
        //let res = await fetch(url);
        let res = await fetch(url);
        console.log(res);
        let text = `${res.statusText} ${res.status}`;
            //let text = res.text();
            //console.log(text);
            return text;
       
    }

//function htmlToText(html) {
//    var temp = document.createElement('div');
//    temp.innerHTML = html;
//    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
//}

    doRequest().then(data => {
        //let a = data.toString();
        console.log(data);
    });


    
const evtSource = new EventSource('http://10.0.0.127/events');
//const eventList = document.querySelector('ul');

evtSource.onmessage = (e) => {
  
  newElement.textContent = `message: ${e.data}`;
  console.log(e.data);
}

