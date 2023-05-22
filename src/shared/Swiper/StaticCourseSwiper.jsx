import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../components/HomePage/home.scss";

import { EffectCoverflow, Autoplay } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MarkAsFavorite from "../../components/HomePage/MarkAsFavorite";

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config.js";

import BeatSpinner from "../Spinners/BeatLoader.jsx";
import { useCartData } from "../../hooks/useCartData";

export default function StaticCourseSwiper() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const cartData = useCartData();

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

    const handleAddToCart = (evt, id) => {
        evt.stopPropagation();
        cartData.addToCart(id);
    };

    function creatorCard(x) {
        return (
            <div id="courseCardContainer" className="card">
                <div className="card-title">{courses[x].title}</div>
                <MarkAsFavorite />
                <div className="card-body">
                    <div className="card-buttons-container">
                        <button onClick={(evt) => handleMeeting(evt, courses[x].creator._id)} className="card-button">
                            Jetzt Teilnehmen <FontAwesomeIcon icon={faAngleRight} className="card-button-icon" />
                        </button>
                    </div>
                    <div className="card-image-container">
                        <img src={courses[x].croppedImage} className="card-image" />
                    </div>
                    {/* <div className="card-buttons-container">
                        <button
                            style={{ fontSize: "10pt" }}
                            onClick={(evt) => handleMeeting(evt, courses[x]._id)}
                            className="card-button"
                        >
                            kostenfreies Erstgespräch buchen
                        </button>
                    </div> */}

                    <div className="descriptionContainer">{courses[x].shortDescription}</div>
                    <button
                        className="card-button"
                        id="zumWarenkorb"
                        onClick={(evt) => handleAddToCart(evt, courses[x]._id)}
                    >
                        Zum Warenkorb{" "}
                    </button>
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
                    speed={5000}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: 50,
                        depth: 100,
                        modifier: 2.5,
                        shadowOffset: 20
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    autoplay={{
                        delay: 1500, // Verzögerung zwischen den Slide-Wechseln in Millisekunden
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
                    <SwiperSlide>{creatorCard(5)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(5)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(5)}</SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}
