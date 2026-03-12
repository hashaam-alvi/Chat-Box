import {ChatUIComponent,MessagesDirective,MessageDirective,} from "@syncfusion/ej2-react-interactive-chat";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";


export default function ChatHome(){
    

    const currentUserModel = {
    id: "user1",
    user: "Albert",
    statusIconCss: "e-icons e-user-online",
  };

  const michaleUserModel = {
    id: "user2",
    user: "Michale Suyama",
    statusIconCss: "e-icons e-user-busy",
    avatarUrl: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.webp?90af0c8'
  };

  const messageToolbarSettings = {
    items: [
      // { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
      { type: "Button", iconCss: "e-icons e-chat-copy", tooltip: "Copy" },
      { type: "Button", iconCss: "e-icons e-chat-reply", tooltip: "Reply" },
      { type: "Button", iconCss: "e-icons e-chat-pin", tooltip: "Pin" },
      { type: "Button", iconCss: "e-icons e-chat-trash", tooltip: "Delete" },
    ],
    width: "100%",
  };

  const suggestions = [
    "Okay will check it",
    "Sounds good!",
    "Hello, How's everyone",
  ];
  const statusModel = {
    iconCss: "e-icons e-chat-seen",
    tooltip: "Seen",
    // text: 'Seen',
  };

  const headerToolbar = {
        items: [ 
          { iconCss: 'e-icons e-menu', align: 'Right', cssClass: 'custom-btn', tooltip: 'Menu' } 

        ]
    };

  return (
    <div className="ChatBoxContainer">
      {/* <h1>Chat Box</h1> */}
      <ChatUIComponent
        user={currentUserModel}
        messageToolbarSettings={messageToolbarSettings}
        suggestions={suggestions}
        autoScrollToBottom={true}
        headerToolbar={headerToolbar}
        headerText="ChatBox"
        // showHeader={false}
      >
        <MessagesDirective>
          <MessageDirective text="This os" author={currentUserModel} ></MessageDirective>
          <MessageDirective text="Hi Michale, are we on track for the deadline?"  author={currentUserModel} ></MessageDirective>
          <MessageDirective  text="Yes, the design phase is complete."  timeStampFormat="MMMM hh:mm:ss" author={michaleUserModel}></MessageDirective>
          <MessageDirective  text="I’ll review it and send feedback by today."  author={currentUserModel} status={statusModel}></MessageDirective>
        </MessagesDirective>
      </ChatUIComponent>
    </div>
  );
}