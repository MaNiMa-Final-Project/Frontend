import { useCartData } from '../hooks/useCartData'


export default function ShoppingCartPage(){
    const cartData = useCartData();

    console.log(cartData.cart);


    return(


        <h1>ShoppingCart</h1>
    )
}