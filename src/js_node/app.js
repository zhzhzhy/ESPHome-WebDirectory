import EventHandler from './eventhandler.js'

//EventHandler("10.0.0.218","state",(a) => {console.log("test pass!",a)});
//EventHandler("10.0.0.190","state",(a) => {console.log("test pass!",a)});
//console.log(EventHandler("10.0.0.190","state"));

export function maintainAddrGroup(data,Operation,callback) {
    let addrGroup = new Set(data);
    console.log(addrGroup);
    callback(addrGroup);
}