import axios from "axios"
import { useState, useEffect } from "react"
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";
import { BASE_URL_PUBLIC } from "../service/config.js";



export default function courses() {
    const [courses, setCourses] = useState(null)
    useEffect(() => {
        getData();

    }, [])
    const getData = async () => {
        const coursesData = await axios.get(BASE_URL_PUBLIC + 'all')
        setCourses(coursesData.data)
    }


    return (<>
        {courses ? courses.map(course => {

            return <div key={course._id}className="Kurse">
                <h1>{course.title}</h1>
                <p>Creator: {course.creator}</p>
                <p>Start: {course.start}</p>
                <p>End: {course.end}</p>
                <label htmlFor="image">Course Image:</label>
                {/* <img src={image} alt="" /> */}
                <p className="courseDescription">Description: {course.description}</p>
        
            </div>
        }) : <p>momentan keine kurse</p>}


    </>)


}

