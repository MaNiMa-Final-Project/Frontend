import { useParams } from "react-router-dom";
import '../components/CourseDetails/courseDetails.scss'

export default function CourseDetailsPage(){

    const { id } = useParams();
    console.log("🚀 ~ file: CourseDetails.jsx:6 ~ CourseDetails ~ id:", id)

    return(
        <div className="courseDetailContainer">

        </div>
    )
}