"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const port = process.env.PORT || 3001;
let onlineUsers = 0;
app.get("/", (req, res) => {
    res.send({ message: "Server is running." });
});
io.on("connection", (socket) => {
    onlineUsers += 1;
    io.emit("onlineUsers", onlineUsers);
    socket.on("message", (msg) => {
        io.emit("newMessage", socket.handshake.auth.username, msg, new Date().toLocaleTimeString());
    });
    socket.on("disconnect", () => {
        onlineUsers -= 1;
        io.emit("onlineUsers", onlineUsers);
    });
});
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
