import axios from "axios";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { BASE_URL_PUBLIC } from "../service/config";
import "../components/LogReg/logreg.scss";
import validateEmail from "../utils(pure fkt)/validateEmail";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  const debouncedFetchData = debounce(fetchData, 100);

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
    }
  }, []);

  useEffect(() => {
    let formattedEmail = email.trim().toLowerCase();
    if (validateEmail(formattedEmail)) {
      debouncedFetchData();
    } else {
      setIsValid(false);
    }
  }, [email]);

  const handleNextPage = () => {
    navigate("/registerForm", { state: { email: email } });
  };

  async function fetchData() {
    try {
      const response = await axios.post(
        BASE_URL_PUBLIC + "register/email",
        { email: email },
        {
          withCredentials: true
        }
      );
      setIsValid(response.data.success);

      if (!response.data.success) {
        setMessage("Choose another email");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="logreg">
      <div className="logreg-form">
        <label className="mailLabel" htmlFor="mailInput">
          Gib die E-Mail-Adresse ein, die du für Konto verwenden möchtest
        </label>
        <input
          type="email"
          name="email"
          id="mailInput"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button className="logreg-button" type="submit" disabled={!isValid} onClick={handleNextPage}>
          Weiter
        </button>
      </div>
      {message}
    </div>
  );
}
