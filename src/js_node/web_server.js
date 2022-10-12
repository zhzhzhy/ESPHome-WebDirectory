import http from 'http'
import  fs, { read } from 'fs'
import { promises as fas } from 'fs'
import { resolve } from 'path';
import { rejects } from 'assert';
import { Server } from "socket.io";
import express from 'express';
import path from 'path';

const app = express();
const port = 5000
const __dirname = path.resolve();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

app.use('/src/asset', express.static(path.join(__dirname, 'src/asset')))

app.use('/src/img', express.static(path.join(__dirname, 'src/img')))



app.listen(port,() => {
    console.log(`listening on port ${port}`)
})


