import { useEffect, useState } from 'react';
import { useCartData } from '../hooks/useCartData'
import '../components/ShoppingCart/shoppingCart.scss'

import axios from 'axios';
import { TEMP_URL_COURSE } from "../service/config";



export default function ShoppingCartPage(){
    const cartData = useCartData();
    const [courses, setCourses] = useState([])

    useEffect(() => {
        console.log(cartData.cart);
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
    }, []);

    let cartItem = courses.map(course => {
        console.log("🚀 ~ file: ShoppingCartPage.jsx:35 ~ cartItem ~ course:", course)

        return(
            <tr key={course._id} className='tableRow'>
                <td className='tableDataCell'><button>delete</button></td>
                <td className='tableDataCell'>{course.title}</td>
                <td className='tableDataCell'>{course.beginning}</td>
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