import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL_PUBLIC } from "../../service/config";
import "../../components/LogReg/logreg.scss";

import ImageCrop from "../../shared/CropImage/ImageCrop";

export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState(location.state.email);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");

  const handleBackButton = () => {
    navigate("/register", { state: { email: email } });
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmedValue = event.target.value;
    setConfirmedPassword(confirmedValue);

    if (password.length > 0 && password !== confirmedValue) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    if (confirmedPassword.length > 0 && confirmedPassword !== passwordValue) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const checkForm = () => {
    const formInputs = [username, name, surname, email, password, confirmedPassword];
    return formInputs.every((input) => input !== "") && !passwordMismatch;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newUser = {
      nickName: username,
      firstName: name,
      lastName: surname,
      email: email,
      password: password,
      image: image
    };

    try {
      const response = await axios.post(BASE_URL_PUBLIC + "register", newUser, {
        withCredentials: true
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="logreg">
      <h2>Account erstellen</h2>
      <form className="logreg-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          type="text"
          name="surname"
          placeholder="Nachname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={email}
          readOnly
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" name="password" placeholder="Passwort" onChange={handlePasswordChange} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Passwort bestätigen"
          onChange={handleConfirmPasswordChange}
        />

        <ImageCrop ownImageWidth={"600"} />

        <fieldset className="btn-group">
          <button className="logreg-button" type="button" onClick={handleBackButton}>
            Zurück
          </button>

          <button className="logreg-button" type="submit" disabled={!checkForm()}>
            Registrieren
          </button>
        </fieldset>

        <p>{message}</p>
        {passwordMismatch && <p style={{ color: "red" }}>Die Passwörter stimmen nicht überein.</p>}
      </form>
    </div>
  );
}
