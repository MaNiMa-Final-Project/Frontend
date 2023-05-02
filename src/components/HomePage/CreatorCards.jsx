import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import '../HomePage/home.scss'


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

        // let splittedImage = creator.image.split('upload');
        // let resizedImage = splittedImage[0]+"upload/c_scale,w_250,h_250"+splittedImage[1];

        return(

            <div key={creator._id} className="card">
                <div className="card-title">{creator.nickName}</div>
                <div className="card-body">
                    <div className="card-buttons-container">
                        <button onClick={() => handleViewCourses(creator._id)} className="card-button">
                            Kurse anzeigen <FontAwesomeIcon icon={faAngleRight} className="card-button-icon" />
                        </button>
                    </div>
                    <div className="card-image-container">
                        <img src={creator.croppedImage} alt={creator.nickName} className="card-image" />
                    </div>
                    <div className="card-buttons-container">
                        <button style={{fontSize: '10pt'}} onClick={(evt) => handleMeeting(evt, creator._id)} className="card-button">
                            kostenfreies Erstgespräch buchen
                        </button>
                    </div>
                </div>
            </div>
        );
    });
}