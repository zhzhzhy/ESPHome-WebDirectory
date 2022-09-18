import EventSource from 'eventsource';

//    async function doRequest() {
//        let url = 'http://10.0.0.127/events';
//        //let res = await fetch(url);
//        let res = await fetch(url);
//        console.log(res);
//        let text = `${res.statusText} ${res.status}`;
//            //let text = res.text();
//            //console.log(text);
//            return text;
//       
//    }


   // doRequest().then(data => {
   //     //let a = data.toString();
   //     console.log(data);
   // });


    
const evtSource = new EventSource('http://10.0.0.190/events');

evtSource.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

evtSource.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);

evtSource.addEventListener('ping', function(e) {
    console.log("ping", e.data);
  }, false);

evtSource.addEventListener('state', function(e) {
    console.log("state", e.data);
    //let a = JSON.stringify(e.data);
    let a = JSON.parse(e.data);
    console.log(a.id);
  }, false);
  evtSource.addEventListener('log', function(e) {
    console.log("log", e.data);
  }, false);

