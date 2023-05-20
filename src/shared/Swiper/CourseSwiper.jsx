import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import "../../components/HomePage/home.scss";

import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";

import SlideNextButton from "./SlideNextButton.jsx";
import SlidePrevButton from "./SlidePrevButton.jsx";

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config.js";

import { useEffect, useState } from "react";

import { useCartData } from "../../hooks/useCartData.jsx";
import { useNavigate } from "react-router-dom";
import MarkAsFavorite from "../../components/HomePage/MarkAsFavorite.jsx";

export default function StaticCourseSwiper() {
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    const swiperRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `all`);
                // const concatenatedData = response.data.concat(response.data); // Aneinanderreihen des Arrays

                setCourses(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleCreatorDetailView = (evt, id) => {
        evt.preventDefault();
        console.log("🚀 ~ file: CreatorCards.jsx:30 ~ 'muss noch verbunden werden':", "muss noch verbunden werden");
        //navigate(`course/${id}`, {});
    };

    const handleMeeting = (evt, id) => {
        evt.stopPropagation();
        console.log("🚀 ~ file: CreatorCards.jsx:36 ~:", "Kalender soll sich öffnen");
        // cartData.addToCart(id);
    };

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

    return (
        <div className="container">
            {isLoading ? ( // Conditional rendering of Swiper based on the loading status
                <div>Loading...</div>
            ) : (
                <Swiper
                    modules={[Virtual, Autoplay, EffectCoverflow, Pagination, Navigation]}
                    effect={"coverflow"}
                    grabCursor={true}
                    spaceBetween={50}
                    slidesPerView={courses.length}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5
                    }}
                    // initialSlide={Math.floor(courses.length / 2)} // Setzt den initialen aktiven Index auf die Mitte des Arrays

                    pagination={{ el: ".swiper-pagination", clickable: true }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        clickable: true
                    }}
                    virtual
                    autoplay={{ delay: 5000 }}
                    className="swiper_container"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {courses.map((course, index) => {
                        return (
                            <SwiperSlide key={course._id} virtualIndex={index}>
                                <div className="courseSwiperSlide">
                                    <a
                                        onClick={(evt) => handleCourseDetailView(evt, course._id)}
                                        className="cardContainer"
                                    >
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

                                            <button
                                                onClick={(evt) => handleAddToCart(evt, course._id)}
                                                className="AddToCartBtn"
                                            >
                                                Add to Card
                                            </button>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                    <div className="slider-controler">
                        <SlidePrevButton />
                        <div className="swiper-pagination"></div>
                        <SlideNextButton />
                    </div>
                </Swiper>
            )}
        </div>
    );
}
