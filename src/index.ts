import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = 4000;

let onlineUsers = 0;

app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

io.on("connection", (socket) => {
  onlineUsers += 1;
  io.emit("onlineUsers", onlineUsers);

  socket.on("message", (msg) => {
    io.emit(
      "newMessage",
      socket.handshake.auth.username,
      msg,
      new Date().toLocaleTimeString()
    );
  });

  socket.on("disconnect", () => {
    onlineUsers -= 1;
    io.emit("onlineUsers", onlineUsers);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
