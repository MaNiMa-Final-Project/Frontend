import { useCartData } from "../../hooks/useCartData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MarkAsFavorite from "./MarkAsFavorite";

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";

export default function CourseCards() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `all`);
                setCourses(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const cartData = useCartData();

    const navigate = useNavigate();

    const handleAddToCart = (evt, id) => {
        evt.stopPropagation();
        cartData.addToCart(id);
    };

   

    const handleCourseDetailView = (evt, id) => {
        evt.preventDefault();
        navigate(`course/${id}`, {});
    };

    const handleMarkAsFavoriteClick = (evt) => evt.stopPropagation();

    return courses.map((course) => {
        return (
            <a onClick={(evt) => handleCourseDetailView(evt, course._id)} key={course._id} className="cardContainer">
                <div className="courseTitle" onClick={handleMarkAsFavoriteClick}>
                    {course.title}
                    <div className="markFav">
                        <MarkAsFavorite courseId={course._id} />
                    </div>
                </div>

                <div className="imageContainer">
                    <img src={course.image} alt="" />
                </div>

                <div className="cardBody">
                    <p className="courseDescription">{course.shortDescription}</p>

                    <button onClick={(evt) => handleAddToCart(evt, course._id)} className="AddToCartBtn">
                        Add to Card
                    </button>
                </div>
            </a>
        );
    });
}
