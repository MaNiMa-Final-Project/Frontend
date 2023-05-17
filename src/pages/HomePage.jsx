import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import CourseCards from "../components/HomePage/CourseCards";
import CreatorCards from "../components/HomePage/CreatorCards";
import SwiperCarousel from "../shared/Swiper/Swiper";

import CourseSwiper from "../shared/Swiper/CourseSwiper";

export default function HomePage() {
    // const particlesInit = useCallback(async (engine) => {
    //     // console.log(engine);

    //     await loadFull(engine);
    // }, []);

    // const particlesLoaded = useCallback(async (container) => {
    //     // await console.log(container);
    // }, []);

    return (
        <div className="homeGridContainer">
            {/* <Particles id="tsparticles" url="particles.json" init={particlesInit} loaded={particlesLoaded} /> */}

            <div className="wochenkursContainer">
                {/* <CourseCards /> */}
                <CourseSwiper />
            </div>

            <div className="slogan">
                <h2>Bringing the Beauty of Art to Your Doorstep</h2>
            </div>

            <div className="dozentenContainer">
                <SwiperCarousel />
            </div>
        </div>
    );
}
