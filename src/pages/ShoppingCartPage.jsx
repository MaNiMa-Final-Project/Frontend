import { useEffect, useState } from 'react';
import { useCartData } from '../hooks/useCartData'

import axios from 'axios';
import { TEMP_URL_COURSE } from "../service/config";



export default function ShoppingCartPage(){
    const cartData = useCartData();

    console.log(cartData.cart);

    const [resp, setResp] = useState(null)



    useEffect(() => {

        (async () => {

            try {

                let response = await axios.post(TEMP_URL_COURSE+'course', 
                    {"ids": cartData.cart}
                );
                
                console.log("🚀 ~ file: ShoppingCartPage.jsx:27 ~ response:", response)

            } catch (error) {
                
            }


        })();



    }, []);




    return(


        <h1>ShoppingCart</h1>
    )
}