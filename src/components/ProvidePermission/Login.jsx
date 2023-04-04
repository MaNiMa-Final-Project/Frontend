import React, { useState } from "react";
import axios from 'axios';
import './logreg.scss'

import { BASE_URL_PUBLIC } from "../../service/config";

// import { userStatus } from "../../service/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    
    const [userLogin, setUserLogin] = useState({
        nameOrMail: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
            BASE_URL_PUBLIC+'login',
            userLogin, {
                withCredentials: true
            });
        
        
        setMessage(response.data.message)

        setTimeout(()=>{
            navigate("/", {})
        },500)

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
                value={userLogin.nameOrMail}
                onChange={(e) =>
                    setUserLogin({ ...userLogin, nameOrMail: e.target.value })
                }
            />
            <input
                type="password"
                name="password"
                placeholder="Passwort"
                value={userLogin.password}
                onChange={(e) =>
                    setUserLogin({ ...userLogin, password: e.target.value })
                }
            />
        <button className="logreg-button" type="submit" value="Login">
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