import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketHandler } from "./sockets";

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3001;

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socketHandler);

app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
