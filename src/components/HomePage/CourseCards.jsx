import { useCartData } from '../../hooks/useCartData'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import MarkAsFavorite from './MarkAsFavorite';

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";

export default function CourseCards(){

    const [courses, setCourses] = useState([])

    useEffect(()=>{
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC+`all`);
                setCourses(response.data);
            } catch (error) {
                console.error(error)
            }
        })();
    }, []);

    const cartData = useCartData();

    const navigate = useNavigate();

    const handleAddToCart = (evt, id) => {
        evt.stopPropagation();
        cartData.addToCart(id);
    }

    const handleCourseDetailView = (evt, id) => {
        evt.preventDefault();
        navigate(`course/${id}`, {});
    }

    const handleMarkAsFavoriteClick = (evt) => evt.stopPropagation();
    

    return courses.map(course => {
        return(
            <a onClick={(evt)=>handleCourseDetailView(evt, course._id)} key={course._id} className="cardContainer">
                <div onClick={handleMarkAsFavoriteClick}>
                    <MarkAsFavorite courseId={course._id}/>
                </div>
                <div className='cardBody'>
                    <h5 className='courseTitle'>
                        {course.title}
                    </h5>
                    <p className='courseDescription'>
                        {course.description}
                    </p>
                    <button onClick={(evt)=>handleAddToCart(evt, course._id)} className='AddToCartBtn'>
                        Add to Card
                    </button>
                    <button onClick={(evt) =>deleteCourseById(evt, course_id)} className='DeleteCourseBtn'>
                        Delete Course
                    </button>
                </div>
            </a>
        )
    });
}
