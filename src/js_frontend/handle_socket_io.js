import { io } from "../asset/socket.io/socket.io.esm.min.js";


// Parse Socket.io data of component data
export function Parse_Socket_io() {
    let socket = io();
    socket.emit("Sync_Addr_Group",[...Addr_Group.values()]);
    socket.on("state", async (arg) => {
      const state = await JSON.parse(arg.data);
      const id = arg.id;
      console.log(`From: ${id}  data: ${state}`); 
      });
}


//Parse_Socket_io();
