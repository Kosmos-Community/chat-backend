import { Socket } from "socket.io";
import { io } from "..";

let onlineUsers = 0;

export function socketHandler(socket: Socket) {
  onlineUsers += 1;
  io.emit("onlineUsers", onlineUsers);

  socket.on("message", (msg) => {
    io.emit(
      "newMessage",
      socket.handshake.auth.username,
      msg,
      new Date().toUTCString()
    );
  });

  socket.on("disconnect", () => {
    onlineUsers -= 1;
    io.emit("onlineUsers", onlineUsers);
  });
}
