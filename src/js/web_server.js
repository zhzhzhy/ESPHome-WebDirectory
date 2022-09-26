import http from 'http'
import  fs, { read } from 'fs'
import { promises as fas } from 'fs'
import { resolve } from 'path';
import { rejects } from 'assert';
import handle_route from './router.js';
//const util = require('node:util');

const server = http.createServer( (req,res) =>{
    const method = req.method;
    console.log("method: ",method);
    let url = req.url;
    console.log("url: ",url);
    req.query = new URLSearchParams(url.split('?')[1]);
    const route = handle_route(url);
    const request_json = JSON.stringify(Object.fromEntries(req.query.entries()));
    //const entries = util.inspect(req.query.entries);
    console.log("request_json:",request_json);
    //if (url === "/") {
    //    url = "/index.html"
    //}
    console.log('route:',route);
    read_file(route).then(result => {res.write(result);res.end();}).catch(() => {console.log("No such file!");res.end();});
}).listen(8080)

function read_file(path){
    return new Promise((resolve,reject) => {fs.readFile(path,'utf-8',(err,data) => {
        if(err){reject();return}
        resolve(data);
    })})
}