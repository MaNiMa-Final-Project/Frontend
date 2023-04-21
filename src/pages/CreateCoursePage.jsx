import { useState } from "react";
import { BASE_URL_PROTECTED } from "../service/config";
import axios from "axios";
import '../components/CreateCourse/createCourse.scss'



export default function CreateCoursePage() {
    
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [price, setPrice] = useState("");
    const [beginning, setBeginning] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formatStart = new Date(`1995-12-17T${start}:00`).getTime();
        let formatEnd = new Date(`1995-12-17T${end}:00`).getTime();

        let milliseconds = formatEnd - formatStart;

        console.log(getHoursAndMinutes(milliseconds));


        let newCourse = {
            title: title,
            creator: creator,
            price: parseInt(price),
            beginning: beginning,
            start: start,
            end: end,
            duration: milliseconds,
            description: description
        }
        console.log("🚀 ~ file: CreateCoursePage.jsx:36 ~ handleSubmit ~ newCourse:", newCourse)

        try {

            let response = await axios.post(BASE_URL_PROTECTED+'createcourse', newCourse, {
                withCredentials: true
            })
            setMessage('Kurs erfolgreich erstellt!')
            console.log(response);

        } catch (error) {
            console.log(error)
            setMessage('Kurserstellung nicht erfolgreich - Bitte Eingabe prüfen!')

        }

        // setTitle("");
        // setCreator("");
        // setBeginning("");
        // setStart("");
        // setEnd("");
        // setDescription("");


    };

    function getHoursAndMinutes(milliseconds) {
      let hours = Math.floor(milliseconds / (60 * 60 * 1000));
      let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
      return `${hours} hours and ${minutes} minutes`;
    }
    

    

    return (
        <div className="CreateCourse">
            <h2>Kurs Erstellen</h2>
            <form className="CourseForm" onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    placeholder="Title"
                    onChange={event => setTitle(event.target.value)} />

                <label>Creator</label>
                <input
                    type="text"
                    id="creator"
                    value={creator}
                    placeholder="Creator"
                    onChange={event => setCreator(event.target.value)} />

                <label>Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    placeholder="Price"
                    onChange={event => setPrice(event.target.value)} />

                <label>Beginning</label>
                <input
                    type="date"
                    id="beginning"
                    value={beginning}
                    placeholder="Beginning"
                    onChange={event => setBeginning(event.target.value)} />

                <label>Start</label>
                <input
                    type="time"
                    id="start"
                    value={start}
                    placeholder="Start"
                    onChange={event => setStart(event.target.value)} />

                <label>End</label>
                <input
                    type="time"
                    id="end"
                    value={end}
                    placeholder="End"
                    onChange={event => setEnd(event.target.value)} />

                <label>Description</label>
                <textarea
                    id="description"
                    value={description}
                    placeholder="Description"
                    onChange={event => setDescription(event.target.value)} />

                <button type="submit">Create Course</button>
            </form>
            {message}
        </div>
    );
}