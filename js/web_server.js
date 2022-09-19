import http from 'http'
import  fs, { read } from 'fs'
import { promises as fas } from 'fs'

const server = http.createServer( (req,res) =>{
    console.log("Web server hello!");
    //const data = read_file("./index.html",res);
    //console.log(data);
    //res.write("hsjhfj",'utf8',(res) => {read_file("./index.html",res)});
    //res.write("tesjfhgjs");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    const data = read_file("./index.html");
    console.log(data);
    res.end();

}).listen(8080)

async function read_file(path){
    const result = await fs.readFile(path,'utf-8',(err,data) => {
        if(err){throw err;return}
        //console.log(data);
        console.log(result);
        //res.write('Hello  World!');
        return result;
    })
}
