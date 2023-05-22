import axios from "axios";
import { BASE_URL_PROTECTED } from "../service/config";
import { useState, useEffect } from "react";

import UserDashboard from "../components/Dashboard/UserDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";

import { v4 as uuidv4 } from "uuid";
import { useLegitUser } from "../hooks/useLegitUser";

export default function DashboardPage() {
    const userData = useLegitUser();
    const [user, setUser] = useState("");

    const [editingProfile, setEditingProfile] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PROTECTED + "user", {
                    withCredentials: true
                });

                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // Funktion zum Bearbeiten des Profils
    const handleProfileEdit = async (newData) => {
        try {
            const response = await axios.put(`${BASE_URL_PROTECTED}profile`, newData, {
                withCredentials: true
            });

            setUser(response.data);
            alert(`Dein Profil wurde erfolgreich aktualisiert!`);
            setEditingProfile(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <p style={{fontSize: '2rem', color: 'white', margin: '0.5rem'}} >{`Willkommen, ${user.nickName}!`}</p>

            {!userData.isCreator && !userData.isAdmin && <UserDashboard user={user} />}
            {userData.isAdmin && <AdminDashboard user={user} />}
            {userData.isCreator && <CreatorDashboard user={user} />}
        </>
    );
}
