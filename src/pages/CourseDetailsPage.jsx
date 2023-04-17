import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TEMP_URL_COURSE } from "../service/config";
import '../components/CourseDetails/courseDetails.scss'


export default function CourseDetailsPage() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);
    console.log("🚀 ~ file: CourseDetailsPage.jsx:12 ~ CourseDetailsPage ~ course:", course)

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`${TEMP_URL_COURSE}course/${id}`);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    if (!course) {

        return <p>Loading...</p>;
    }



    /*todo
    
    (course model überdenken/erweitern -> preis / likes / ...)
    
    1. useeffect -> getbyId 
    2. course in usestate speichern
    3. mapped über den course aus dem state
    4. visualizerung
    
    
    */

    console.log("🚀 ~ file: CourseDetails.jsx:6 ~ CourseDetails ~ id:", id)

    return (
        <div className="courseDetailContainer">
            <h1>{course.title}</h1>
            <p>Creator: {course.creator}</p>
            <p>Start: {course.start}</p>
            <p>End: {course.end}</p>
            <p>Description: {course.description}</p>
        </div>
    )
}