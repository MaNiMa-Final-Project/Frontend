import { useState } from "react";
import axios from "axios";
import "./dashboard.scss";
import { TEMP_URL_COURSE, BASE_URL_PROTECTED } from "../../service/config";
import formatCurrencyDE from "../../service/formatCurrencyDE.js";

import SideBar from "../../shared/Sidebar/SideBar";

export default function AdminDashboard({ user }) {
    console.log("🚀 ---------------------------------------------🚀");
    console.log("🚀 ~ file: AdminDashboard.jsx:10 ~ user:", user);
    console.log("🚀 ---------------------------------------------🚀");
    const [userResult, setUserResult] = useState([]);
    const [courseResult, setCourseResult] = useState([]);

    const [userQuery, setUserQuery] = useState("");
    const [courseQuery, setCourseQuery] = useState("");

    const [selectedValue, setSelectedValue] = useState("");

    const handleFormSubmit = async (event, userId) => {
        event.preventDefault();
        if (selectedValue && userId) {
            try {
                const response = await axios.get(BASE_URL_PROTECTED + `role?u=${userId}&r=${selectedValue}`, {
                    withCredentials: true
                });

                handleUserSearch(event);
            } catch (error) {
                // Fehlerbehandlung bei Anfrageproblemen
                console.error("Fehler bei der Benutzeranfrage:", error);
            }
        }
    };

    const handleSelectChange = (event) => setSelectedValue(event.target.value);

    // Die handleUserSearch-Funktion
    const handleUserSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(BASE_URL_PROTECTED + `users?q=${userQuery}`, {
                withCredentials: true
            });
            setCourseResult([]);
            setUserResult(response.data);
        } catch (error) {
            // Fehlerbehandlung bei Anfrageproblemen
            console.error("Fehler bei der Benutzeranfrage:", error);
        }
    };

    // Die handleCourseSearch-Funktion
    const handleCourseSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(TEMP_URL_COURSE + `course?q=${courseQuery}`, {
                withCredentials: true
            });
            setUserResult([]);
            setCourseResult(response.data);
        } catch (error) {
            // Fehlerbehandlung bei Anfrageproblemen
            console.error("Fehler bei der Kursanfrage:", error);
        }
    };

    let courses = courseResult.map((course, index) => {
        let dozent = course.creator;

        return (
            <li key={course._id}>
                <span>
                    {index + 1}.<p>Kursname: {course.title}</p>
                    <p>Preis: {formatCurrencyDE(course.price)} </p>
                    <p>Dozent: {dozent.nickName}</p>
                    <p>Teilnehmer: </p>
                </span>
                <button>Rundmail</button>

                <button>Bearbeiten</button>

                <button>Löschen</button>
            </li>
        );
    });

    let users = userResult.map((user, index) => {
        const roleObj = user.role;
        const role = roleObj.name;
        const capitalizedString = role.charAt(0).toUpperCase() + role.slice(1);

        return (
            <li key={user._id}>
                <span>
                    {index + 1}.<p className="role">Rolle: {capitalizedString}</p>
                    <p>Nutzername: {user.nickName}</p>
                    <p>Vorname: {user.firstName}</p>
                    <p>Nachname: {user.lastName}</p>
                    <p>Besuchte Kurse:</p>
                    <p>Kommentare:</p>
                </span>
                <form onSubmit={(e) => handleFormSubmit(e, user._id)}>
                    <select value={selectedValue} onChange={handleSelectChange}>
                        <option value="">Rollen</option>
                        {capitalizedString != "User" && <option value="6405ac7d6b2564cd76c42605">User</option>}
                        {capitalizedString != "Creator" && <option value="6405ac7d6b2564cd76c42604">Creator</option>}
                        {capitalizedString != "Admin" && <option value="6405ac7d6b2564cd76c42603">Admin</option>}
                    </select>
                    <button type="submit">Submit</button>
                </form>
                <button>mail</button>

                <button>anonymize</button>

                <button>delete</button>
            </li>
        );
    });

    return (
        <div className="adminViewContainer">
            <div className="userSection">
                <form onSubmit={handleUserSearch}>
                    <input type="text" value={userQuery} onChange={(event) => setUserQuery(event.target.value)} />
                    <button type="submit">Suche User</button>
                </form>
            </div>

            <div className="courseSection">
                <form onSubmit={handleCourseSearch}>
                    <input type="text" value={courseQuery} onChange={(event) => setCourseQuery(event.target.value)} />
                    <button type="submit">Suche Kurs</button>
                </form>
            </div>

            <div className="resultSection">
                <h1>
                    Suchergebnis
                    {courseResult.length > 0 && " für Kurse"}
                    {userResult.length > 0 && " für User"}
                </h1>
                <ul className="resultList">
                    {courseResult && courses}
                    {userResult && users}
                </ul>
            </div>
            <SideBar user={user} />
        </div>
    );
}
