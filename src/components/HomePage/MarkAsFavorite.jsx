import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLegitUser } from "../../hooks/useLegitUser";
import { useEffect, useState } from "react";

export default function MarkAsFavorite({ evt, courseId }) {
    const userData = useLegitUser();


    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        let resp = userData.isCourseFavorite(courseId);
        if (resp) setIsFavorite(resp);
    }, [userData]);

    const handleFavoriteChange = async (event) => {
        event.stopPropagation();

        if (event.target.checked) {

            let body = {
                courseId: courseId
            }
            try {
                let resp = await axios.put(BASE_URL_PUBLIC+'addtofav', body, {
                    withCredentials: true
                });
                
            } catch (error) {
                console.log(error);
            }
            setIsFavorite(!isFavorite);
        } else {
            let body = {
                courseId: courseId
            }
            try {
                let resp = await axios.put(BASE_URL_PUBLIC+'removefromfav', body, {
                    withCredentials: true
                });
                
            } catch (error) {
                console.log(error);
            }
            setIsFavorite(false);
        }
    };

    const checkboxStyle = {
        position: "absolute",
        opacity: 0,
        cursor: "pointer",
        height: 0,
        width: 0
    };

    const labelStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        backgroundColor: "white",
        borderRadius: "50%",
        textAlign: "center",
        cursor: "pointer",
        width: "1.5em",
        height: "1.5em",
        lineHeight: "1.8rem",
        margin: "0 5px",
        color: "#3F80EE"
    };

    return (
        userData.user && <label style={labelStyle} id="MASF">
            <input type="checkbox" checked={isFavorite} onChange={handleFavoriteChange} style={checkboxStyle} />
            {isFavorite ? (
                <span style={{ textShadow: "0 0 5px white", color: "#f7c134" }}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            ) : (
                <span style={{ textShadow: "0 0 5px #3f80ee" }}>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            )}
        </label>
    );
}
