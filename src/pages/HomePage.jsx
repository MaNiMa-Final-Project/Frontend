import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import CourseCards from "../components/HomePage/CourseCards";
import CreatorCards from "../components/HomePage/CreatorCards";
import SwiperCarousel from "../shared/Swiper/Swiper";

export default function HomePage() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);

        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <div className="homeGridContainer">
            <Particles id="tsparticles" url="particles.json" init={particlesInit} loaded={particlesLoaded} />

            <div className="dozentenContainer">
                <SwiperCarousel />
            </div>

            <div className="wochenkursContainer">
                <CourseCards />
            </div>
        </div>
    );
}
