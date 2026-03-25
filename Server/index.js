const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../') })
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const users = require("./models/users");
const rooms = require("./models/rooms");
const db = require("./DB/DB_connection");

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

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("getMessages", async (roomId) => {
    const messages = await db.any(` SELECT m.*, u.username  FROM messages m  JOIN users u ON m.user_id = u.id  WHERE m.room_id = $1  ORDER BY m.created_at ASC `, [roomId]);
    socket.emit("previousMessages", messages);
  });

  socket.on("sendMessage", async (data) => {
    // console.log(data.text);
    const { text, user_id, room_id } = data;
    const newMessage = await db.one(
      `INSERT INTO messages (text, user_id, room_id) 
       VALUES ($1, $2, $3) 
       RETURNING *, (SELECT username FROM users WHERE id = $2) as username`, 
      [text, user_id, room_id]
    );
    io.to(room_id).emit("receiveMessage", newMessage);
  });
  
  socket.on("deleteMessage", async (data) => {
    const newMessages = await db.none(
      `Delete from messages where id = $1 `, 
      data
    );
    // io.to(room_id).emit("previousMessages", newMessage);
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
