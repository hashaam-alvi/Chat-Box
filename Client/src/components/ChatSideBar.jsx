import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import BASE_URL from "./config.js"

export default function ChatSideBar({ isOpen, isMobile, toggleSidebar,handleLogout,setActiveRoom }) {
const [showModal, setShowModal] = useState(false);
const [rooms, setRooms] = useState([]);
 let [formData, setFormData] = useState({ chatName: "" });
 
 const fetchRooms = async () => {
     try {
       const res = await axios.get(`${BASE_URL}/getRooms`); 
       const data = res.data;
       
       if (data.success) {
         setRooms(data.rooms);
       }
     } catch (err) {
       console.error("Error fetching rooms:", err);
     }
   };

useEffect(() => {
  fetchRooms();
}, []);

const handleCreateChatbutton = () =>{
    setShowModal(true);
}

const handleCreateChat = async () =>{
    const { chatName } = formData;

    const res = await axios.post(`${BASE_URL}/createChat`, {chatName})
    const data = res.data;

    if (data.success) {
      setShowModal(false);
      setFormData({ chatName: "" });
      fetchRooms();
    } 
}

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };


  return (
    <>
      {isMobile && isOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      <div
        className={`custom-sidebar 
          ${isOpen ? "open" : ""} 
          ${isMobile ? "mobile" : "desktop"}
        `}
      >
        <div className="sidebar-header">
            <h1>ChatBox</h1>
        </div>
        <div className="sidebar-content">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="chat-item" 
              onClick={() => setActiveRoom(room)} 
            >
              {room.chatname.toUpperCase()}
            </div>
          ))}
        </div>

        <button className="logout" onClick={handleLogout}> Logout </button>
        <button className="addChat" onClick={handleCreateChatbutton}>+</button>
      </div>

      {showModal && (
        <div className="simple-modal-overlay">
          <div className="modal-card">
            <h2>Add New Chat/Group</h2>
            <input label="chatName" name="chatName" value={formData.chatName} type="text" placeholder="Chat/Group Name" onChange={handleInputChange} />
            <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-add" onClick={handleCreateChat}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}