import { useEffect, useState } from 'react';
import { useCartData } from '../hooks/useCartData'
import '../components/ShoppingCart/shoppingCart.scss';

import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import { TEMP_URL_COURSE } from "../service/config";

export default function ShoppingCartPage(){
    const cartData = useCartData();
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.post(TEMP_URL_COURSE+'course', 
                    {"ids": cartData.cart}
                );
                setCourses(response.data);
            } catch (error) {
                console.error(error)
            }
        })();
    }, [cartData]);

    const handleCartDelete = (courseId) => {
        cartData.removeFromCart(courseId)
    }

    let subTotal = 0;
    let cartItem = courses.map(course => {
        

        let temp = new Date(course.beginning).toLocaleString('de-DE').split(',')
        let date = temp[0]+` - ${course.start} Uhr`


        return(
            <tr key={course._id} className='tableRow'>
                
                <td className='tableDataCell'><button onClick={() => handleCartDelete(course._id)} ><FontAwesomeIcon icon={faSquareXmark} /></button></td>
                <td className='tableDataCell'>{course.title}</td>

                <td className='tableDataCell'>{date}</td>
                <td className='tableDataCell'>{course.duration}</td>
                <td className='tableDataCell'>{course.price} €</td>
                <td className='tableDataCell'>{}</td>

                <td className='tableDataCell'>{subTotal+= course.price} €</td>

            </tr>
        )
        
    })



    return(

        <div className='cartContainer'>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Course</th>
                        <th>Date</th>

                        <th>Duration</th>

                        <th>Price</th>
                        <th></th>
                        <th>Subtotal</th>



                    </tr>
                </thead>
                <tbody>
                    {cartItem}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
            <div className='cartSummary'>
                <div className='cartTotal'>
                    <div className='cartSummaryHeader'>
                        <h1>Cart totals</h1>
                    </div>
                    <div className='cartSummaryBody'>
                        <hr />
                        <h2>Total</h2>
                        {subTotal}
                    </div>
                </div>
            </div>
        </div>

    )
}