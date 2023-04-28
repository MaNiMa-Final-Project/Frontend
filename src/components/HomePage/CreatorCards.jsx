import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";


export default function CreatorCards() {

    const [creators, setCreators] = useState([])


    useEffect(()=>{
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC+`dozenten`);
                setCreators(response.data);


            } catch (error) {
                console.error(error)
            }
        })();


    }, []);

    const handleCreatorDetailView = (evt, id) => {
        evt.preventDefault();
        console.log("🚀 ~ file: CreatorCards.jsx:30 ~ 'muss noch verbunden werden':", 'muss noch verbunden werden')
        //navigate(`course/${id}`, {});
    }

    const handleMeeting = (evt, id) => {
        evt.stopPropagation();
        console.log("🚀 ~ file: CreatorCards.jsx:36 ~:", "Kalender soll sich öffnen")
        // cartData.addToCart(id);
    }

    return creators.map(creator => {

        console.log("🚀 ~ file: CreatorCards.jsx:61 ~ creator:", creator)


        return(
            <a onClick={(evt)=>handleCreatorDetailView(evt, creator._id)} key={creator._id} className="creatorContainer">

                <div className='courseTitle'>
                        {creator.nickName}
                </div>

                <div className='imageContainer'>
                    <img src={creator.image} alt=""/>

                    <button onClick={(evt)=>handleMeeting(evt, creator._id)} className='AddToCartBtn'>
                        Erstgespräch buchen
                    </button>

                </div>

            </a>
        )
    });
}