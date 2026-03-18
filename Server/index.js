const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../') })
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const users = require("./models/users");
const rooms = require("./models/rooms");

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-box-lime-pi.vercel.app"],
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log(data);

    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/", users);
app.use("/", rooms);

app.use("/", (req , res)=>{
  res.send("at Default Root")
})
