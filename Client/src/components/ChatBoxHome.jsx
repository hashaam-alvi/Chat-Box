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

/* useEffect(() => {
  console.log("Messages updated:", activeRoom);
}, [messages]); */



useEffect(() => {
  socketRef.current = io(BASE_URL);

  socketRef.current.on("connect", () => {
    // console.log("Connected");
  });

/*   socketRef.current.on("previousMessages", (msgs) => {
    setMessages(msgs);
  });

  socketRef.current.on("receiveMessage", (msg) => {
    setMessages((prev) => [...prev, msg]);
  }); */

  socketRef.current.on("previousMessages", (msgs) => {
  const formatted = msgs.map(msg => ({
    ...msg,
    originalId: msg.id,        
    id: `msg_${msg.id}`        
  }));

  setMessages(formatted);
});

socketRef.current.on("receiveMessage", (msg) => {
  const formatted = {
    ...msg,
    originalId: msg.id,
    id: `msg_${msg.id}`
  };

  setMessages((prev) => [...prev, formatted]);
});

  socketRef.current.on("messageDeleted", ({ id }) => {
    setMessages(prev =>
      prev.filter(msg => msg.originalId !== id)
    );
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);

  useEffect(() => {
    setMessages([]); 
    if (!activeRoom  || !socketRef.current ) return;
    
    const emitData = () => {
      socketRef.current.emit("joinRoom", activeRoom.id);
      socketRef.current.emit("getMessages", activeRoom.id);
    };
    
    if (socketRef.current.connected) {
      emitData();
    } else {
      socketRef.current.once("connect", emitData);
    }
  }, [activeRoom]);
  



 function sendMessage(messageText) {
  if (!activeRoom || !socketRef.current || !messageText.trim()) return;

  const messageData = {
    text: messageText,
    room_id: activeRoom.id,
    user_id: storedUser.id, 
    username: storedUser.username, 
    created_at: new Date().toISOString()
  };

  socketRef.current.emit("sendMessage", messageData);
  
}

function deleteMessage(messageID) {
 if (!activeRoom || !socketRef.current || !messageID) return;

//  setMessages(prev =>
//     prev.filter(msg => msg.originalId !== messageID)
//   );

 const messageData = {
  id: messageID,
  userId: storedUser.id,
  roomId: activeRoom.id,
 }

// console.log(activeRoom.id);
 socketRef.current.emit("deleteMessage", messageData);
 
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
       <ChatBoxPage isMobile={isMobile}  toggleSidebar={toggleSidebar} isOpen={isOpen} activeRoom ={activeRoom} messages={messages} sendMessage={sendMessage} deleteMessage={deleteMessage} />
    </div>
  );
}
