import "./style.css";

export default function ChatSideBar({ isOpen, isMobile, toggleSidebar }) {
  return (
    <>
      {/* Overlay (only mobile) */}
      {isMobile && isOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      <div
        className={`custom-sidebar 
          ${isOpen ? "open" : ""} 
          ${isMobile ? "mobile" : "desktop"}
        `}
      >
        <div className="sidebar-header">Chats</div>
        <div className="sidebar-content">
          <div className="chat-item">User 1</div>
          <div className="chat-item">User 2</div>
        </div>
      </div>
    </>
  );
}