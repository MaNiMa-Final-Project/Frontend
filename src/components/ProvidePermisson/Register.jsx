import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL_PUBLIC } from "../../service/config";

function Register() {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = {
      username: username,
      email: email,
      password: password
    }

    try {
      const response = await axios.post( BASE_URL_PUBLIC+'register', newUser, {
        withCredentials: true
      });
      //navigate('/login',{})
      setMessage(response.data.message)

    } catch (error) {
        console.log("🚀 ~ file: Register.js:31 ~ handleSubmit ~ error:", error.response.data)
        setMessage(error.response.data.message)
    }
};

    return(
        <div className="register">
        <h2>Account erstellen</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="register-button" type="submit" value="Registrieren" />
          <p>{message}</p>
        </form>
      </div>
    )
}

export default Register;