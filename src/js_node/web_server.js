import http from 'http'
import  fs, { read } from 'fs'
import { promises as fas } from 'fs'
import { resolve } from 'path';
import { rejects } from 'assert';
import handle_route from './router.js';
import { Server } from "socket.io";
import express from 'express';
//const util = require('node:util');

//const server = http.createServer( (req,res) =>{
//    const method = req.method;
//    console.log("method: ",method);
//    let url = req.url;
//    console.log("url: ",url);
//    req.query = new URLSearchParams(url.split('?')[1]);
//    const route_file = handle_route(url);
//    const request_json = JSON.stringify(Object.fromEntries(req.query.entries()));
//    //const entries = util.inspect(req.query.entries);
//    //console.log("request_json:",request_json);
//    // console.log('route_file:',route_file);
//    if(!route_file){
//        res.end('file not found!');
//    }else{
//    read_file(route_file).then(result => {res.write(result);res.end();}).catch((error) => {console.error(error,"file:",route_file);res.end('fail to read file!');});
//    }
//}).listen(8080)

//function read_file(path){
//    return new Promise((resolve,reject) => {fs.readFile(path,'utf-8',(err,data) => {
//        if(err){reject(new Error("fail to read file!\n"))}
//        resolve(data);
//    })})
//}