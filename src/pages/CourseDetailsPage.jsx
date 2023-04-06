import { useParams } from "react-router-dom";
import '../components/CourseDetails/courseDetails.scss'

export default function CourseDetailsPage(){

    const { id } = useParams();

/*todo

(course model überdenken/erweitern -> preis / likes / ...)

1. useeffect -> getbyId 
2. course in usestate speichern
3. mapped über den course aus dem state
4. visualizerung




*/

    console.log("🚀 ~ file: CourseDetails.jsx:6 ~ CourseDetails ~ id:", id)

    return(
        <div className="courseDetailContainer">
            
        </div>
    )
}