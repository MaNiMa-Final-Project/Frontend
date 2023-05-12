import { useSwiper } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function SlidePrevButton() {
    const swiper = useSwiper();
    function handleFirstCard(evt) {
        if (swiper.isBeginning) {
            swiper.slideTo(swiper.virtual.slides.length - 1);
        } else {
            swiper.slidePrev();
        }
    }

    return (
        <div className="swiper-button-prev slider-arrow" onClick={handleFirstCard}>
            <FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} />
        </div>
    );
}
