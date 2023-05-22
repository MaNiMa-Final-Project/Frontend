import React, { useState } from 'react';

const Kontaktformular = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nachricht, setNachricht] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNachrichtChange = (e) => {
    setNachricht(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kannst du die Logik zum Absenden des Formulars implementieren
    console.log('Formular abgesendet!');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Nachricht:', nachricht);
    // Zurücksetzen der Formulardaten
    setName('');
    setEmail('');
    setNachricht('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="nachricht">Nachricht:</label>
        <textarea
          id="nachricht"
          className="form-textarea"
          value={nachricht}
          onChange={handleNachrichtChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="form-submit-btn">Absenden</button>
    </form>
  );
};

export default Kontaktformular;

