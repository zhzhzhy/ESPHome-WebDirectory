import http from 'http'
import  fs, { read } from 'fs'
import { promises as fas } from 'fs'
import { resolve } from 'path';
import { rejects } from 'assert';

const server = http.createServer( (req,res) =>{
    console.log("Web server hello!");
    read_file("./index.html").then(result => {res.write(result);res.end();}).catch(() => {console.log("No such file!");res.end();});
    //res.end();
}).listen(8080)

function read_file(path){
    return new Promise((resolve,reject) => {fs.readFile(path,'utf-8',(err,data) => {
        if(err){reject();return}
        resolve(data);
    })})
}