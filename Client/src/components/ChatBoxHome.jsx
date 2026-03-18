import ChatBoxPage from "./ChatBoxPage";
import { io } from "socket.io-client";
import { useEffect, useRef, useState  } from "react";
import ChatSideBar from "./ChatSideBar";
import "./style.css"
import BASE_URL from "./config.js";

export default function ChatBoxHome({handleLogout}) {
  const socketRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  socketRef.current = io(BASE_URL);

  socketRef.current.on("connect", () => {
    console.log("Connected");
  });

  socketRef.current.on("previousMessages", (msgs) => {
    setMessages(msgs);
  });

  socketRef.current.on("receiveMessage", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);

  useEffect(() => {
    setMessages([]); 
    if (!activeRoom  || !socketRef.current ) return;
    console.log("in useeffect getmessages is called")

    const emitData = () => {
    console.log("Emitting joinRoom for:", activeRoom.id);
    socketRef.current.emit("joinRoom", activeRoom.id);
    socketRef.current.emit("getMessages", activeRoom.id);
  };

  if (socketRef.current.connected) {
    emitData();
  } else {
    // If not connected yet, wait for the connect event
    socketRef.current.once("connect", emitData);
  }
  }, [activeRoom]);



 function sendMessage(messageText) {
  // 1. Basic Safety checks
  if (!activeRoom || !socketRef.current || !messageText.trim()) return;

  // 2. Prepare the payload
  const messageData = {
    text: messageText,
    room_id: activeRoom.id,
    user_id: storedUser.id, // Ensure storedUser.id exists!
    username: storedUser.username, // Helpful for the UI to show who sent it
    created_at: new Date().toISOString()
  };

  // 3. Emit to Server
  socketRef.current.emit("sendMessage", messageData);
  
  console.log("Message sent to room:", activeRoom.id);
}

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 650;
      setIsMobile(mobile);

      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

 

  return (
    <div className="ChatBoxHome">
       <ChatSideBar isOpen={isOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} handleLogout={handleLogout} setActiveRoom={setActiveRoom}  />
       <ChatBoxPage isMobile={isMobile}  toggleSidebar={toggleSidebar} isOpen={isOpen} activeRoom ={activeRoom} messages={messages} sendMessage={sendMessage} />
    </div>
  );
}
