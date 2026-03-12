// import './App.css'
import ChatBoxHome from "./components/ChatBoxHome";
import { registerLicense } from "@syncfusion/ej2-base";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/Login/LoginPage";
registerLicense("Ngo9BigBOggjHTQxAR8/V1JGaF1cXmhKYVJyWmFZfVhgd19GZ1ZRR2YuP1ZhSXxVdkZjXn9dcHNVRWdeWEN9XEA=");
import { useState } from "react";

function App() {
  const storedUser = localStorage.getItem("user");
 
 const [user, setUser] = useState(JSON.parse(storedUser)); 


  if (user) {
    return <ChatBoxHome  />;
  }

  return (
    
    <LoginPage  setUser={setUser} />
  );


}

export default App;
