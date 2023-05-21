import axios from "axios";
import { useState, useEffect } from "react";
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";
import { BASE_URL_PUBLIC } from "../service/config.js";

import CourseSwiper from "../shared/Swiper/CourseSwiper";

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

    return (
        <div className="coursePageContainer">
          {courses && courses.map((course) => {
            console.log("🚀 ----------------------------------------🚀")
          console.log("🚀 ~ file: Kurse.jsx:37 ~ course:", course)
          console.log("🚀 ----------------------------------------🚀")
            
            return <div className="courseContainer" key={course.id}>
                <div className="courseHeader">
                    <h2>{course.title}</h2>
                    <img src={course.creator.croppedImage} alt="" />

                </div>
                <div className="courseBody">
                    <p>{course.description}</p>

                </div>
                <div className="courseFooter">
                    
                </div>

            </div>
          })}

        </div>
      );
    }
