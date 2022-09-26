import EventSource from 'eventsource';

/* 
Eventhandler for ESPHome Eventsource API
 Example:: 
 EvenHandler("10.0.0.190","state");
*/

export default function EvenHandler(addr,types) {
    
const evtSource = new EventSource('http://' + addr + '/events');

evtSource.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

evtSource.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);

if (types === 'ping') {
evtSource.addEventListener('ping', function(e) {
    console.log("ping", e.data);
  }, false);
}

if (types === 'state') {
evtSource.addEventListener('state', function(e) {
    console.log("state", e.data);
    //let a = JSON.stringify(e.data);
    let a = JSON.parse(e.data);
    console.log(a.id);
  }, false);
}

if (types === 'log') {
  evtSource.addEventListener('log', function(e) {
    console.log("log", e.data);
  }, false);
}
}
