import { useSwiper } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function SlideNextButton() {
    const swiper = useSwiper();
    function handleLastCard(evt) {
        if(swiper.isEnd) {
            swiper.slideTo(0);
        } else {
            swiper.slideNext();
        }
    }

    return (
        <div className="swiper-button-next slider-arrow" onClick={handleLastCard}>
            <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
        </div>
    );
}

