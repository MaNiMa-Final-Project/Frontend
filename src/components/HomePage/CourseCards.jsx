import { useCartData } from '../../hooks/useCartData'
import { useNavigate } from "react-router-dom";
import { data } from "../../service/fakeData"

export default function CourseCards(){
    const cartData = useCartData();

    const navigate = useNavigate();

    const handleAddToCart = (evt, id) => {
        // Button
        evt.stopPropagation();
        cartData.addToCart(id);
    }

    const handleCourseDetailView = (evt, id) => {
        // Anchor
        evt.preventDefault();
        navigate(`course/${id}`, {});
    }



    return data.map(course => {
        return(
            <a onClick={(evt)=>handleCourseDetailView(evt, course._id)} key={course._id} className="cardContainer">
                {/* <img className='cardPicture' src="..." alt="" /> */}
                <div className='cardBody'>
                    <h5 className='courseTitle'>
                        {course.title}
                    </h5>
                    <p className='courseDescription'>
                        {course.description}
                    </p>
                    <button onClick={(evt)=>handleAddToCart(evt, course._id)} className='AddToCartBtn'>
                        Add to Card
                    </button>
                </div>
            </a>
        )
    });
}