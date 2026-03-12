import ChatHome from "./ChatHome";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";


export default function ChatBoxHome() {
  const socketRef = useRef(null);
  
  useEffect(() => {
    // socketRef.current = io("http://localhost:5000");
    socketRef.current = io("https://chat-box-production-ecb4.up.railway.app");

    socketRef.current.on("connect", () => {
      console.log("Connected");
    });

    socketRef.current.on("receiveMessage", (msg) => {
      console.log("New Message Received", msg);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };

  }, []);
  
  function sendMessage(message) {
    socketRef.current.emit("sendMessage", message);
  }

  return(
    <>
      <ChatHome/>
    </>
  );
}
