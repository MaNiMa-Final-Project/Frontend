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
        let response = await axios.get(TEMP_URL_COURSE + `course/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="courseDetailContainer">
      <h1 className="courseTitle">{course.title}</h1>
      <MarkAsFavorite />
      <div className="courseInfo">
        <p>Creator: {course.creator}</p>
        <p>Start: {course.start}</p>
        <p>End: {course.end}</p>
        <label htmlFor="image">Course Image:</label>
        <img src={image} alt="" />
        <p className="courseDescription">Description: {course.description}</p>
        <span>More information coming soon...</span>
      </div>
    </div>
  );
}
