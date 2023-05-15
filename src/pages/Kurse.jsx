import axios from "axios";
import { useState, useEffect } from "react";
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";
import { BASE_URL_PUBLIC } from "../service/config.js";

import CourseSwiper from "../shared/Swiper/CourseSwiper";

export default function courses() {
    // const [courses, setCourses] = useState(null);
    // useEffect(() => {
    //     getData();
    // }, []);
    // const getData = async () => {
    //     const coursesData = await axios.get(BASE_URL_PUBLIC + "all");
    //     setCourses(coursesData.data);
    // };

    return (
        <>
            <CourseSwiper />
        </>
    );
}
