import { io } from "../asset/socket.io/socket.io.esm.min.js";
import { Parse_Socket_io } from "./handle_socket_io.js";

let Addr_Group = new Set();



Parse_Socket_io();
console.log(Addr_Group);