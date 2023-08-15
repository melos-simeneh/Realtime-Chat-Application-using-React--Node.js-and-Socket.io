const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let activeUsers = [];
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.roomId);

    console.log(`User with ID: ${socket.id} joined room:${data.roomId}`);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server is running");
});
