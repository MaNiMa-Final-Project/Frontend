

import '../components/HomePage/home.scss'
import CourseCards from '../components/HomePage/CourseCards'
import CreatorCards from '../components/HomePage/CreatorCards'

export default function HomePage(){


    return(
        <div className='homeGridContainer'>

            <div className='workshopContainer'>
                <CreatorCards />
            </div>

            <div className='wochenkursContainer'>
                <CourseCards />

            </div>

            <div className='einzelkurseContainer'>
        
            </div>

        </div>
    )
}

