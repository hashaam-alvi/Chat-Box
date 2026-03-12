const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const users = require("./models/users")

app.use(cors());
app.use(express.json()); 

// const io = require('socket.io')(server);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


io.on('connection', (socket) => { 
    console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log(data);

    // broadcast message
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
 });


server.listen(5000, () => {
  console.log("Server running on port 5000");
});


app.use('/login',users);
app.use('/',users);