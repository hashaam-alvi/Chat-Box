import { ChatUIComponent, MessagesDirective, MessageDirective,  } from "@syncfusion/ej2-react-interactive-chat";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";

export default function ChatBoxPage({ isMobile, toggleSidebar, isOpen, activeRoom, messages, sendMessage, deleteMessage }) {
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : "Anonymous";

  const currentUserModel = {
    id: userData.id,
    user: userData.username,
    statusIconCss: "e-icons e-user-online",
  };

  const michaleUserModel = {
    id: "user2",
    user: userData.username,
    statusIconCss: "e-icons e-user-busy",
    avatarUrl:
      "https://newprofilepic.photo-cdn.net//assets/images/article/profile.webp?90af0c8",
  };

  const messageToolbarSettings = {
    items: [
      // { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
      { type: "Button", iconCss: "e-icons e-chat-copy", tooltip: "Copy" },
      { type: "Button", iconCss: "e-icons e-chat-reply", tooltip: "Reply" },
      { type: "Button", iconCss: "e-icons e-chat-pin", tooltip: "Pin" },
      { type: "Button", iconCss: "e-icons e-chat-trash", tooltip: "Delete" },
    ],

    itemClicked: (args) => {
      if (args.item.prefixIcon === 'e-icons e-chat-trash'){
        console.log(args.message.originalId);
        deleteMessage(args.message.originalId)
        args.cancel = true;
      }
    },

    width: "100%",
  };

  const suggestions = [
    "Okay will check it",
    "Sounds good!",
    new Date().toLocaleTimeString(),

  ];

  const statusModel = {
    iconCss: "e-icons e-chat-seen",
    tooltip: "Seen",
    // text: 'Seen',
  };

  const formattedMessages = messages.map((msg) =>( {
    id: `msg_${msg.id}`,
    originalId: msg.id,
    text: msg.text,
    author: { text: msg.username || 'User', id: msg.user_id },
    createdAt: msg.created_at
}));
    

  const roomName = activeRoom ? activeRoom.chatname : "ChatBox";


  return (
    <div className="ChatBoxContainer">
      <div className={`chat-content ${isOpen ? "shifted" : ""}`}>
        {/* <div className={"chat-content"}> */}
        <div className="chat-header">
          <h3>{roomName.toUpperCase()}</h3>
          {isMobile && (
            <button onClick={toggleSidebar} className="menu-btn">
              ☰
            </button>
          )}
        </div>
        <ChatUIComponent
          // key={messages.length}
          user={currentUserModel}
          messageToolbarSettings={messageToolbarSettings}
          suggestions={suggestions}
          autoScrollToBottom={true}
          // headerToolbar={headerToolbar}
          // headerText="ChatBox"
          showHeader={false}
          messageSend={(args) => {
            sendMessage(args.message.text);
            args.cancel = true; 
          }}
          messages={formattedMessages} 
        >
          {/* <MessagesDirective>
            <MessageDirective
              text="This os"
              author={currentUserModel}
            ></MessageDirective>
            <MessageDirective
              text="Hi Michale, are we on track for the deadline?"
              author={currentUserModel}
            ></MessageDirective>
            <MessageDirective
              text="Yes, the design phase is complete."
              timeStampFormat="MMMM hh:mm:ss"
              author={michaleUserModel}
            ></MessageDirective>
            <MessageDirective
              text="I’ll review it and send feedback by today."
              author={currentUserModel}
              status={statusModel}
            ></MessageDirective>
          </MessagesDirective> */}

          <MessagesDirective>
            {messages.map((msg, index) => (
              <MessageDirective
                key={index}
                text={msg.text}
                author={{
                  id: msg.user_id,
                  user: msg.username || "User",
                }}
              />
            ))}
          </MessagesDirective>
        </ChatUIComponent>
      </div>
    </div>
  );
}
