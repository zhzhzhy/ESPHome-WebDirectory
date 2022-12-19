import http from 'http'
import fs, { read } from 'fs'
import { promises as fas } from 'fs'
import { resolve } from 'path';
import { rejects } from 'assert';
import { Server } from "socket.io";
import express from 'express';
import path from 'path';
import EventHandler from './eventhandler.js'
import { maintainAddrGroup } from "./app.js";

(() => {

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const port = 5000
  const __dirname = path.resolve();

  let addrGroup = new Set();

  io.on('connection', (socket) => {
    socket.on("syncAddrGroup", (msg) => {
      maintainAddrGroup(msg, 'sync', (data) => {
        for (let i of data) {
          EventHandler(i, "state", (a) => { socket.emit("state", { id: i, data: a }); });
          EventHandler(i, "log", (a) => { socket.emit("log", { id: i, data: a }); });
        }
      })
    })
    console.log('a user connected');
    //EventHandler("10.0.0.190","state",(a) => {socket.emit("state", a);});
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })

  app.use('/src/asset', express.static(path.join(__dirname, 'src/asset')))
  app.use('/src/img', express.static(path.join(__dirname, 'src/img')))
  app.use('/src/css', express.static(path.join(__dirname, 'src/css')))
  app.use('/src/js_frontend', express.static(path.join(__dirname, 'src/js_frontend')))
  //app.use('/socket.io', express.static(path.join(__dirname, 'socket.io')))


  server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })


})()