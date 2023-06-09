import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL_PUBLIC } from "../service/config";
import BeatSpinner from "../shared/Spinners/BeatLoader";
import MarkAsFavorite from "../components/HomePage/MarkAsFavorite";
import Calendar from "react-calendar";
import getHoursAndMinutes from "../shared/getHoursAndMinutes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function CreatorPage() {
    const { id } = useParams();

    const location = useLocation();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chosenCourse, setChosenCourse] = useState(null);
    const [message, setMessage] = useState("");

    const handleBookMeeting = (title) => {
        setIsModalOpen(true);

        setChosenCourse(title);
    };

    useEffect(() => {
        if (location.state.show) {
            setIsModalOpen(true);
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSaveBookedMeeting = () => {
        setMessage("Bitte prüfe deine Mails");
    };

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `creator/${id}`);
                if (response.status === 200) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // function getHoursAndMinutes(milliseconds) {
    //     let hours = Math.floor(milliseconds / (60 * 60 * 1000));
    //     let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
    //     if (hours === 0) return `${minutes} m`;
    //     if (minutes === 0) return `${hours} h`;
    //     return `${hours} h and ${minutes} m`;
    // }

    return (
        <div className="CreatorPage">
            {isLoading ? (
                <BeatSpinner isLoading={isLoading} />
            ) : (
                <>
                    <section className="innerContainer">
                        <div className="imageContainer">
                            <img src={data.creatorData.croppedImage} alt="" />
                        </div>
                        <p
                            className="textContainer"
                            dangerouslySetInnerHTML={{ __html: data.creatorData.profileText }}
                        ></p>
                    </section>
                    <section className="outerCourseContainer">
                        {data.courses.map((course) => {
                            let temp = new Date(course.beginning).toLocaleString("de-DE").split(",");
                            let date = temp[0] + ` - ${course.start} Uhr`;
                            let dauer = getHoursAndMinutes(course.duration);

                            return (
                                <div key={course._id} className="creatorCourseContainer">
                                    <div className="titleFavorite">
                                        <h1 className="courseTitle">{course.title}</h1>
                                        <MarkAsFavorite />
                                    </div>
                                    <button
                                        type="button"
                                        className="meetingBookBtn"
                                        onClick={() => handleBookMeeting(course.title)}
                                    >
                                        Erstgespräch buchen
                                    </button>
                                    <div className="courseContainer" key={course.id}>
                                        <div className="courseHeader">
                                            <h2>{course.title}</h2>
                                            <img
                                                style={{ width: "300px", margin: "1rem auto" }}
                                                src={course.croppedImage}
                                                alt=""
                                            />
                                            <MarkAsFavorite courseId={course._id} />
                                        </div>
                                        <div className="courseBody">
                                            <p>{course.description}</p>
                                        </div>
                                        <div style={{ margin: "1rem" }} className="courseFooter">
                                            <p>Dauer: {getHoursAndMinutes(course.duration)} </p>
                                            <p></p>
                                            <p>Preis: {course.price}€</p>
                                        </div>
                                        <div className="buttonContainer"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                    {isModalOpen && (
                        <div className="modal">
                            {message ? (
                                <div className="modalContent">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>{message}</div>
                                        <button
                                            style={{ border: "solid 1px", padding: "1rem" }}
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="modalContent">
                                    <h2>Termin buchen</h2>
                                    <Calendar />
                                    <div className="modalButtons">
                                        <div>
                                            {!chosenCourse && (
                                                <select>
                                                    <option value={chosenCourse}>
                                                        Bitte wählen Sie einen Kurs aus
                                                    </option>
                                                    {data.courses.map((course) => (
                                                        <option key={course._id} value={course._id}>
                                                            {course.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>

                                        <div>
                                            <button type="button" onClick={() => handleSaveBookedMeeting()}>
                                                Buchen
                                            </button>
                                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                                Abbrechen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
