import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import '../components/HomePage/home.scss'
import CourseCards from '../components/HomePage/CourseCards'

export default function HomePage(){

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return(
        
        <div className='homeGridContainer'>
            <Particles id="tsparticles" url="particles.json" init={particlesInit} loaded={particlesLoaded} />
            <CourseCards />
        </div>
    )
}

