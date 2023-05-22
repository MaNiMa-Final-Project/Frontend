import { useState, useEffect } from "react";
import axios from "axios";
import { TEMP_URL_COURSE } from "../service/config";
import "../components/CourseDetails/courseDetails.scss";
import { useParams } from "react-router-dom";
import MarkAsFavorite from "../components/HomePage/MarkAsFavorite";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(TEMP_URL_COURSE + `/course/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (!course) {
        return <p>Loading...</p>;
    }

    function getHoursAndMinutes(milliseconds) {
        let hours = Math.floor(milliseconds / (60 * 60 * 1000));
        let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
        if (hours === 0) return `${minutes} m`;
        if (minutes === 0) return `${hours} h`;
        return `${hours} h and ${minutes} m`;
    }

    let temp = new Date(course.beginning).toLocaleString("de-DE").split(",");
    let date = temp[0] + ` - ${course.start} Uhr`;
    let dauer = getHoursAndMinutes(course.duration);

    return (
        <div className="courseDetailContainer">
            <h1 className="courseTitle">{course.title}</h1>
            <MarkAsFavorite courseId={course._id}/>
            <div className="courseInfo">
                <p>Nächster Kursbeginn: {date}</p>
                <p>Dauer : {dauer}</p>
                <strong>
                    <p>Price: {course.price}€</p>
                </strong>
                <img src={course.image} alt="" />
                <p className="courseDescription">Description: {course.description}</p>
            </div>
        </div>
    );
}
