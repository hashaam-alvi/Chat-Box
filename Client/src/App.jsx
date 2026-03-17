// import './App.css'
import ChatBoxHome from "./components/ChatBoxHome";
import { registerLicense } from "@syncfusion/ej2-base";
import LoginPage from "./components/Login/LoginPage";
registerLicense("Ngo9BigBOggjGyl/VkV+XU9AclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3hTdURkWXtfc3RTQmlbUE91XA==");
registerLicense("Ngo9BigBOggjGyl/VkR+XU9Ff1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3hTdURkWXtfeHFXQ2ldVE91XQ==");
import { useState } from "react";

function App() {
  const storedUser = localStorage.getItem("user");
 
 const [user, setUser] = useState(JSON.parse(storedUser)); 


  if (user) {
    return <ChatBoxHome  />;
  }

  return (
    
    <LoginPage  setUser={setUser}/>
  );


}

export default App;
