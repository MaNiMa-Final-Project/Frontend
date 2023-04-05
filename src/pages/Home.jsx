import { useLegitUser } from '../hooks/useLegitUser.jsx'
import { useEffect } from 'react';

import '../components/Home/home.scss'
import CourseCards from '../components/Home/CourseCards'

export default function Home(){


    const userData = useLegitUser();

    useEffect(()=>{
        (async function() {
            await userData.fetchUser();
        })();
        console.log("App rerender");
    },[]);

    return(
        <div className='homeGridContainer'>
            <CourseCards />
        </div>
    )
}