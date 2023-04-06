import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL_PUBLIC } from "../service/config";
import '../components/LogReg/logreg.scss'

export default function RegisterForm(){

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
                setMessage(error.response.data.message)
            }
    };

    return(
        <div className="logreg">
        <h2>Account erstellen</h2>
        <form className="logreg-form" onSubmit={handleSubmit}>
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

          <button className="logreg-button" type="submit">
            Anmelden
          </button>



          <p>{message}</p>
        </form>
      </div>
    )


}