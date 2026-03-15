import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import axios from "axios";
import BASE_URL from "../config.js"


export default function LoginPage({setUser}) {
  let [isError, setIsError] = useState(false);
  let [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    const { username , password } = formData;

    const res = await axios.post(`${BASE_URL}/login`, {username, password})
    const data = res.data;

    if (data.success) {
      console.log("Login successful", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      console.log("Invalid credentials");
      setIsError(true);
    }

  };


  return (
    <LoginForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isError={isError} />
  );
}
