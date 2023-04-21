import axios from "axios";
import { BASE_URL_PROTECTED } from "../service/config";
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';



export default function DashboardPage(){

    const [user, setUser] = useState("")

    const [editingProfile, setEditingProfile] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PROTECTED+'user', {
                    withCredentials: true
                });

                setUser(response.data)
            } catch (error) {
                console.error(error)
            }
        })();
    }, []);

    // Funktion zum Bearbeiten des Profils
    const handleProfileEdit = async (newData) => {
        try {
            const response = await axios.put(`${BASE_URL_PROTECTED}profile`, newData, {
                withCredentials: true,
            });

            setUser(response.data);
            alert(`Dein Profil wurde erfolgreich aktualisiert!`);
            setEditingProfile(false);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <p>{`Willkommen zurück, ${user.nickName}!`}</p>

            <div className="coursePreviewContainer">
                <section className="coursePreview section1">
                {/* Vorgemerkte Kurse anzeigen */}
                <h1>Vorgemerkte Kurse anzeigen</h1>
                    {user.notedCourses && (
                        <ul>
                            {user.notedCourses.map((course) => (
                                <li key={uuidv4()}>{course.title}</li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="coursePreview section2">
                {/* Evetuelle bevorstehende Kurse anzeigen */}
                
                <h1>Bevorstehende Kurse</h1>
                    {user.upcomingCourses && (
                        <ul>
                            {user.upcomingCourses.map((course) => (
                                <li key={uuidv4()}>{course.title}</li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="coursePreview section3">
                {/* Teilgenommene Kurse anzeigen */}

                <h1>Teilgenommene Kurse anzeigen</h1>
                    {user.attendedCourses && (
                        <ul>
                            {user.attendedCourses.map((course) => (
                                <li key={uuidv4()}>{course.title}</li>
                            ))}
                        </ul>
                    )}
                </section>

                <aside className="sidebar">
                    {/* Profil bearbeiten Button */}
                    <button onClick={() => setEditingProfile(true)}>Profil bearbeiten</button>

                    {/* Profil bearbeiten Formular */}
                    {editingProfile && (
                        <>
                            <h2>Profil bearbeiten</h2>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleProfileEdit({
                                    firstName: formData.get('firstName'),
                                    lastName: formData.get('lastName'),
                                    avatar: formData.get('avatar')
                                });
                            }}>
                                <label htmlFor="firstName">Vorname:</label>
                                <input type="text" id="firstName" name="firstName" defaultValue={user.firstName} />

                                <label htmlFor="lastName">Nachname:</label>
                                <input type="text" id="lastName" name="lastName" defaultValue={user.lastName} />

                                <label htmlFor="avatar">Avatar:</label>
                                <input type="file" id="avatar" name="avatar" accept="image/*" /> 

                                <button type="submit">Änderungen speichern</button>
                                <button onClick={() => setEditingProfile(false)}>Abbrechen</button>
                            </form>
                        </>
                    )}
                </aside>
            </div>



        </>
    )
}

