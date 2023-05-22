import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SideBar from "../../shared/Sidebar/SideBar";

import "./dashboard.scss";
import { useCartData } from "../../hooks/useCartData";

export default function UserDashboard({ user }) {
    const [editingProfile, setEditingProfile] = useState(false);
    const cartData = useCartData();

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

    const handleAddToCart = (evt, id) => {
        evt.stopPropagation();
        cartData.addToCart(id);
    };

    return (
        <div className="coursePreviewContainer">
            <section className="coursePreview section1">
                {/* Vorgemerkte Kurse anzeigen */}
                <h1>Vorgemerkte Kurse anzeigen</h1>
                {user.notedCourses && (
                    <div className="innerCourseContainer">
                        <ul>
                            {user.notedCourses.map((course, index) => {
                                let splitImage = course.image.split("upload");
                                let scaledImage = splitImage[0] + `upload/w_${90},h_${70}` + splitImage[1];

                                return (
                                    <li key={uuidv4()}>
                                        <div className="infoContainer">
                                        <div className="innerInfoContainer">
                                        {index + 1}.<img src={scaledImage} alt="" /> 
                                        </div>{course.title}
                                        </div>
                                        <button
                                            className="card-button"
                                            id="zumWarenkorb"
                                            onClick={(evt) => handleAddToCart(evt, course._id)}
                                        >
                                            Zum Warenkorb{" "}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </section>

            <section className="coursePreview section2">
                {/* Evetuelle bevorstehende Kurse anzeigen */}

                <h1>Bevorstehende Kurse</h1>
                {user.upcomingCourses && (
                    <div className="innerCourseContainer">
                        <ul>
                            {user.upcomingCourses.map((course, index) => {
                                let splitImage = course.image.split("upload");
                                let scaledImage = splitImage[0] + `upload/w_${90},h_${70}` + splitImage[1];

                                return (
                                    <li key={uuidv4()}>
                                        <div className="infoContainer">
                                        <div className="innerInfoContainer">
                                        {index + 1}.<img src={scaledImage} alt="" /> 
                                        </div>{course.title}
                                        </div>
                                        <button
                                            className="card-button"
                                            id="zumWarenkorb"
                                            onClick={(evt) => handleAddToCart(evt, course._id)}
                                        >
                                            Kurs Details{" "}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </section>

            <section className="coursePreview section3">
                {/* Teilgenommene Kurse anzeigen */}

                <h1>Teilgenommene Kurse anzeigen</h1>
                {user.attendedCourses && (
                    <div className="innerCourseContainer">
                        <ul>
                            {user.attendedCourses.map((course, index) => {
                                let splitImage = course.image.split("upload");
                                let scaledImage = splitImage[0] + `upload/w_${90},h_${70}` + splitImage[1];

                                return (
                                    <li key={uuidv4()}>
                                        <div className="infoContainer">
                                        <div className="innerInfoContainer">
                                        {index + 1}.<img src={scaledImage} alt="" /> 
                                        </div>{course.title}
                                        </div>
                                        <button
                                            className="card-button"
                                            id="zumWarenkorb"
                                            onClick={(evt) => handleAddToCart(evt, course._id)}
                                        >
                                            Kommentiere den Kurs{" "}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </section>

            <SideBar user={user} />
        </div>
    );
}
