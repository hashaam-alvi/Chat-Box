import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx"
import axios from "axios";
import BASE_URL from "../config.js"


export default function LoginPage({setUser}) {
  let [isError, setIsError] = useState(false);
  let [isSignup, setIsSignup] = useState(false);
  let [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { username , password } = formData;

    const res = await axios.post(`${BASE_URL}/login`, {username, password})
    const data = res.data;

    if (data.success) {
      console.log("Login successful", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      setIsError(true);
    }
  };


  let handleSignupSubmit = async (event) => {
    event.preventDefault();
    const { username, password, confirmpassword } = formData;

    if ( password === confirmpassword) {
      const res = await axios.post(`${BASE_URL}/signup`, {username, password})
      const data = res.data;
        console.log("in Pasword match")
      if (data.success) {
        console.log("Signup successful", data.user);
        setIsSignup(false);
        // localStorage.setItem("user", JSON.stringify(data.user));
        // setUser(data.user);
      } else {
        // setIsError(true);
        console.log("error occured");
      }

    }
    else {
      setIsError(true);
    }

  };

  let handleSignup = () => {
    setFormData({
      username: "",
      password: ""
      });
    setIsError(false);
    setIsSignup(true);
  };

  let handleLogin = () => {
    setFormData({
      username: "",
      password: ""
      });
    setIsError(false);
    setIsSignup(false);
  };


  return (
    <>
      {isSignup ? (
          <SignUpForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSignupSubmit} isError={isError} handleLogin={handleLogin} />
      ) : (
        
        <LoginForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleLoginSubmit} isError={isError}  handleSignup={handleSignup} />
      )}
    
    </>
  );
}
