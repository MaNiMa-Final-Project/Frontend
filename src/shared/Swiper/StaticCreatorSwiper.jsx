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

import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config.js";

import BeatSpinner from "../Spinners/BeatLoader.jsx";

export default function StaticCreatorSwiper() {
    const [creators, setCreators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `dozenten`);
                if (response.status === 200) {
                    setCreators(response.data);
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
            <div id="dozentenCard" className="card">
                <div className="card-title">
                    {creators[x].firstName} {creators[x].lastName}
                </div>
                <div className="card-body">
                    <div className="card-buttons-container">
                        <button
                            onClick={(evt) => handleCreatorDetailView(evt, creators[x]._id)}
                            className="card-button"
                        >
                            Kurse anzeigen <FontAwesomeIcon icon={faAngleRight} className="card-button-icon" />
                        </button>
                    </div>
                    <div className="card-image-container">
                        <img src={creators[x].croppedImage} alt={creators[x].nickName} className="card-image" />
                    </div>
                    <div className="card-buttons-container">
                        <button
                            style={{ fontSize: "9pt", border: 'solid 1px', margin: '2rem auto', width: '100%' }}
                            onClick={(evt) => handleMeeting(evt, creators[x]._id)}
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
                    speed={5000}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5
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
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(0)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(1)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(2)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(3)}</SwiperSlide>
                    <SwiperSlide>{creatorCard(4)}</SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}
