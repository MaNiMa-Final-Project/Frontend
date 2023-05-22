import { useEffect, useState } from "react";
import { useCartData } from "../hooks/useCartData";
import "../components/ShoppingCart/shoppingCart.scss";

import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { TEMP_URL_COURSE } from "../service/config";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartPage() {
    const cartData = useCartData();
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.post(TEMP_URL_COURSE + "/course", { ids: cartData.cart });

                setCourses(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [cartData]);

    const handleCartDelete = (courseId) => {
        cartData.removeFromCart(courseId);
    };

    function getHoursAndMinutes(milliseconds) {
        let hours = Math.floor(milliseconds / (60 * 60 * 1000));
        let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
        if (hours === 0) return `${minutes} m`;
        if (minutes === 0) return `${hours} h`;
        return `${hours} Std. and ${minutes} min`;
    }

    const handleBackToShop = () => {
        navigate("/");
    };

    let subTotal = 0;
    let cartItem = courses.map((course) => {
        let splitImage = course.image.split("upload");
        let scaledImage = splitImage[0] + `upload/w_${90},h_${70}` + splitImage[1];

        let formattedDuration = getHoursAndMinutes(course.duration);

        let temp = new Date(course.beginning).toLocaleString("de-DE").split(",");
        let date = temp[0] + ` - ${course.start} Uhr`;

        return (
            <tr key={course._id} className="tableRow">
                <td className="tableDataCell">
                    <button onClick={() => handleCartDelete(course._id)}>
                        <FontAwesomeIcon className="x-icon" icon={faSquareXmark} />
                    </button>
                </td>

                <td className="imgTableDataCell">
                    <img src={scaledImage} />
                    <strong>{course.title}</strong>
                </td>

                <td className="tableDataCell">{date}</td>
                <td className="tableDataCell">~ {formattedDuration}</td>
                <td className="tableDataCell">{course.price} €</td>
                <td className="tableDataCell">{}</td>

                <td className="tableDataCell">
                    <strong>{(subTotal += course.price)} €</strong>
                </td>

                {/* <td className="tableDataCell">{date}</td>
                <td className="tableDataCell">{course.duration}</td>
                <td className="tableDataCell">{course.start}</td> */}
            </tr>
        );
    });

    return (
        <div className="cartContainer">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Kurs</th>

                        <th>Datum</th>

                        <th>Dauer</th>

                        <th>Preis</th>
                        <th></th>
                        <th>Zwischensumme</th>
                    </tr>
                </thead>
                <tbody>{cartItem}</tbody>
                <tfoot></tfoot>
            </table>

            <div className="cartSummary">
                <div className="cartTotal">
                    <div className="cartSummaryHeader">
                        <strong><h1 className="zusammenfassung" >Zusammenfassung</h1></strong>
                    </div>

                    <div className="cartSummaryBody">
                        <strong>
                            <h2>Summe</h2>
                        </strong>
                        <strong>{subTotal} €</strong>
                    </div>

                    <div className="cartSummaryFooter">
                        <button>Jetzt bezahlen</button>
                        <button onClick={handleBackToShop}>Zurück zum Shop</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
