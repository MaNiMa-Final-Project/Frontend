import React, { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import '../../assets/global.scss'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, EffectFade, Autoplay } from "swiper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config.js";

import "../../components/HomePage/home.scss";

import { useEffect, useState } from "react";

import BeatSpinner from "../Spinners/BeatLoader.jsx";
import { useNavigate } from "react-router-dom";

export default function StaticCourseSwiper() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `all`);
                if (response.status === 200) {
                    setCourses(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleCreatorDetailView = (evt, id) => {
        evt.preventDefault();
        navigate(`/creator/${id}`, { state: { show: false } });
    };

    const handleMeeting = (evt, id) => {
        evt.stopPropagation();
        navigate(`/creator/${id}`, { state: { show: true } });
        // cartData.addToCart(id);
    };

    function creatorCard(x) {
        return (
            <div className="card">
                <div className="card-title">{courses[x].title}</div>
                <div className="card-body">
                    <div className="card-buttons-container">
                        <button
                            // onClick={(evt) => handleCreatorDetailView(evt, creators[x]._id)}
                            className="card-button"
                        >
                            Kurse anzeigen <FontAwesomeIcon icon={faAngleRight} className="card-button-icon" />
                        </button>
                    </div>
                    <div className="card-image-container">
                        <img src={courses[x].croppedImage} className="card-image" />
                    </div>
                    <div className="card-buttons-container">
                        <button
                            style={{ fontSize: "10pt" }}
                            onClick={(evt) => handleMeeting(evt, courses[x]._id)}
                            className="card-button"
                        >
                            kostenfreies Erstgespräch buchen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {isLoading ? ( // Conditional rendering of Swiper based on the loading status
                <BeatSpinner isLoading={isLoading} />
            ) : (
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    loop={true}
                    spaceBetween={1}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    autoplay={{
                        delay: 3000, // Verzögerung zwischen den Slide-Wechseln in Millisekunden
                        disableOnInteraction: true, // Autoplay stoppt nicht, wenn der Benutzer mit dem Swiper interagiert
                        pauseOnMouseEnter: true
                    }}
                    className="swiper_container"
                >
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}
