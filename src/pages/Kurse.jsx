import axios from "axios";
import { useState, useEffect } from "react";
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";
import { BASE_URL_PUBLIC } from "../service/config.js";
import MarkAsFavorite from "../components/HomePage/MarkAsFavorite";

export default function courses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const coursesData = await axios.get(BASE_URL_PUBLIC + "all");
            setCourses(coursesData.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    function getHoursAndMinutes(milliseconds) {
        let hours = Math.floor(milliseconds / (60 * 60 * 1000));
        let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
        if (hours === 0) return `${minutes} min`;
        if (minutes === 0) return `${hours} Std.`;
        return `${hours} Std. und ${minutes} min`;
    }

    return (
        <div className="coursePageContainer">
            {courses &&
                courses.map((course) => {
                    return (
                        <div className="courseContainer" key={course.id}>
                            <div className="courseHeader">
                                <h2>{course.title}</h2>
                                <img src={course.croppedImage} alt="" />
                                <img id="creatorCardPicture" src={course.creator.croppedImage} alt="" />
                                <MarkAsFavorite courseId={course._id} />
                            </div>
                            <div className="courseBody">
                                <p>{course.description}</p>
                            </div>
                            <div className="courseFooter">
                                <p>Dauer: {getHoursAndMinutes(course.duration)} </p>
                                <p>
                                    Dozent: {course.creator.firstName} {course.creator.lastName}
                                </p>
                                <p>Preis: {course.price}€</p>
                            </div>
                            <div className="buttonContainer"></div>
                        </div>
                    );
                })}
        </div>
    );
}
