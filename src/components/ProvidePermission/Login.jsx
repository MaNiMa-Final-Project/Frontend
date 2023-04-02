import React, { useState } from "react";
import axios from 'axios';
import './logreg.scss'

import { BASE_URL_PUBLIC } from "../../service/config";

// import { userStatus } from "../../service/config";
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
        
        // navigate("/", {state: await userStatus()})
        setMessage(response.data.message)


        // localStorage.setItem("token", data.data.token);
      } catch (error) {
        setMessage(error.response.data)
      }
    };

  return (
    <div className="logreg">
        <h2>Login</h2>
      <form className="logreg-form" onSubmit={handleSubmit}>
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
        <button className="login-button" type="submit" value="Login">
          Anmelden
        </button>
        <button className="passwort-vergessen">
          Passwort vergessen?
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;