import EventHandler from './eventhandler.js'

//EventHandler("10.0.0.218","state",(a) => {console.log("test pass!",a)});
//EventHandler("10.0.0.190","state",(a) => {console.log("test pass!",a)});
//console.log(EventHandler("10.0.0.190","state"));

export function Maintain_Addr_Group(data,Operation,callback) {
    let Addr_Group = new Set(data);
    console.log(Addr_Group);
    callback(Addr_Group);
}