import axios from "axios";
import { useState } from "react";
import { BASE_URL_PUBLIC } from "../service/config";
import '../components/LogReg/logreg.scss'


export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const[isValid, setIsValid] = useState(false)
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post( BASE_URL_PUBLIC+'register/email', {email: email}, {
                withCredentials: true
            });

            setIsValid(response.data.success)
            console.log("🚀 ~ file: RegisterPage.jsx:18 ~ handleSubmit ~ response:", response.data)
            //navigate('/login',{})

        } catch (error) {
            console.error(error)
        }
    };
    
    
    return(
        <div className="logreg">
            <form className="logreg-form" onSubmit={handleSubmit}>
                <label className="mailLabel" htmlFor="mailInput">
                    Gib die E-Mail-Adresse ein, die du für Konto verwenden möchtest
                </label>
                <input
                    type="email"
                    name="email"
                    id="mailInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="logreg-button" type="submit" >
                    Weiter
                </button>
            </form>
            {message}
        </div>
    )

}
