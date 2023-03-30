import React, { useState } from "react";
import axios from "axios";

import { BASE_URL_PUBLIC } from "../../service/config";

import { userStatus } from "../service/checkStatus";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
        const [userLogin, setUserLogin] = useState({
        login: "",
        password: ""
        });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        const response = await axios.post(
            BASE_URL_PUBLIC+'login',
            userLogin,
            {withCredentials: true}
        );
        
        navigate("/", {state: await userStatus()})
        setMessage(response.data.message)


        // localStorage.setItem("token", data.data.token);
      } catch (error) {
        setMessage(error.response.data)
      }
    };

  return (
    <div className="login">
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Email or Username"
          onChange={(e) =>
            setUserLogin({ ...userLogin, login: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          onChange={(e) =>
            setUserLogin({ ...userLogin, password: e.target.value })
          }
        />
        <input className="login-button" type="submit" value="Login" />
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;