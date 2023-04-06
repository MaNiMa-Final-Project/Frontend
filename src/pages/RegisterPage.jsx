import axios from "axios";
import debounce from 'lodash/debounce';
import { useEffect, useState } from "react";
import { BASE_URL_PUBLIC } from "../service/config";
import '../components/LogReg/logreg.scss'
import validateEmail from "../utils(pure fkt)/validateEmail";


export default function RegisterPage() {

    const debouncedFetchData = debounce(fetchData, 300);


    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false)
    const [message, setMessage] = useState('');

    async function fetchData() {
        try {
            const response = await axios.post( BASE_URL_PUBLIC+'register/email', {email: email}, {
                withCredentials: true
            });
            console.log("🚀 ~ file: RegisterPage.jsx:23 ~ fetchData ~ response:", response)

            setIsValid(response.data.success);
            console.log(response.data.success);
        } catch(error) {
          console.error(error);
        }
      }

    const handleInput = (e) => {
        let email = e.target.value.trim().toLowerCase();
        setEmail(email)
        if (validateEmail(email)) {
            debouncedFetchData()
        }
    };
    
    
    return(
        <div className="logreg">
            <form className="logreg-form">
                <label className="mailLabel" htmlFor="mailInput">
                    Gib die E-Mail-Adresse ein, die du für Konto verwenden möchtest
                </label>
                <input
                    type="email"
                    name="email"
                    id="mailInput"
                    placeholder="Email"
                    value={email}
                    onChange={handleInput}
                />

                <button 
                    className="logreg-button" 
                    type="submit"
                    disabled={!isValid}

                    >
                    Weiter
                </button>
            </form>
            {message}
        </div>
    )

}
