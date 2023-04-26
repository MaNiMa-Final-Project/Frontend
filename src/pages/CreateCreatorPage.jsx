import { useState } from "react";


export default function CreateCreatorPage() {
  const [nickName, setNickName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  function checkForm() {
    return (
      nickName.trim().length > 0 &&
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      password.length > 0 &&
      confirmedPassword.length > 0 &&
      !passwordMismatch
    );
  }

  const handleConfirmPasswordChange = (event) => {
    const confirmedValue = event.target.value;
    setConfirmedPassword(confirmedValue);
    
    if(password.length > 0 && password !== confirmedValue) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    
    if(confirmedPassword.length > 0 && confirmedPassword !== passwordValue) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!checkForm()) {
      setMessage('Bitte füllen Sie alle Felder aus.');
      return;
    }
    

    try {

        let newCreator = {
            nickName: nickName,
            firstName: firstName,
            surName: lastName,
            email: email,
            password: password,
            image: image
        }
        console.log("🚀 ---------------------------------------------------------------------------🚀")
        console.log("🚀 ~ file: CreateCreatorPage.jsx:67 ~ handleSubmit ~ newCreator:", newCreator)
        console.log("🚀 ---------------------------------------------------------------------------🚀")





      setMessage('Benutzer wurde erfolgreich erstellt.');

    //   setUsername('');
    //   setName('');
    //   setSurname('');
    //   setPassword('');
    //   setConfirmedPassword('');
    //   setPasswordMismatch(false);
    //   setImage(null);

    } catch (error) {
      console.error(error);
      setMessage('Es gab einen Fehler beim Erstellen des Benutzers. Bitte versuchen Sie es später noch einmal.');
    }
  }

  function handleBackButton() {
    // Zurück-Button-Logik hier implementieren
  }

  function imageChangeHandler(evt) {
    const filereader = new FileReader();
    const imgFile = filereader.readAsDataURL(evt.target.files[0]);
    filereader.onloadend = (evt) => {
      const filedata = filereader.result;
      setImage(filedata);


    };
  }


  return (
    <div className="logreg">
      <h2>Dozenten Nutzerkonto erstellen</h2>
      <form className="logreg-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="nickName"
          placeholder="Benutzername"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        
        <input
          type="text"
          name="surname"
          placeholder="Nachname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
            type="password" 
            name="password" 
            placeholder="Passwort" 
            onChange={handlePasswordChange}  
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Passwort bestätigen"
          onChange={handleConfirmPasswordChange}
        />

        {/* Hier ein Beispiel für das Hochladen eines Bildes */}
        <input 
            type="file" 
            accept="image/*" 
            onChange={imageChangeHandler} 
        />

        {image && <img src={image} alt="Vorschau des ausgewählten Bilds" />}

        <fieldset className="btn-group">
          <button className="logreg-button" type="button" onClick={handleBackButton}>
            Zurück
          </button>

          <button className="logreg-button" type="submit" disabled={!checkForm()}>
            Anmelden
          </button>
        </fieldset>

        <p>{message}</p>
        {passwordMismatch && <p style={{ color: 'red' }}>Die Passwörter stimmen nicht überein.</p>}



      </form>
    </div>
  );
}
