import { useEffect, useState } from 'react';
import { useCartData } from '../hooks/useCartData'
import '../components/ShoppingCart/shoppingCart.scss'

import axios from 'axios';
import { TEMP_URL_COURSE } from "../service/config";

export default function ShoppingCartPage(){
    const cartData = useCartData();
    const [courses, setCourses] = useState([])

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

    let cartItem = courses.map(course => {
        //todo insert delete icon

        let temp = new Date(course.beginning).toLocaleString('de-DE').split(',')
        let date = temp[0]+` - ${course.start} Uhr`

        return(
            <tr key={course._id} className='tableRow'>
                
                <td className='tableDataCell'><button onClick={() => handleCartDelete(course._id)} >delete</button></td>
                <td className='tableDataCell'>{course.title}</td>
                <td className='tableDataCell'>{course.price} €</td>

                <td className='tableDataCell'>{date}</td>
                <td className='tableDataCell'>{course.duration}</td>
                <td className='tableDataCell'>{course.start}</td>

            </tr>
        )
    })



    return(

        <div className='cartContainer'>
            <h1>ShoppingCart</h1>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Course</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Duration</th>

                    </tr>
                </thead>
                <tbody>
                    {cartItem}
                </tbody>
                <tfoot>

                </tfoot>
            </table>

        </div>

    )
}