import { useState } from "react";
import { BASE_URL_PUBLIC, BASE_URL_PROTECTED } from "../service/config";
import axios from "axios";
import "../components/CreateCourse/createCourse.scss";
import { useEffect } from "react";

import ImageCrop from "../shared/CropImage/ImageCrop";

import MyEditor from "../shared/Wysiwyg/TextEditor";

const IMG_SIZE = 0.5;

import {
    faCamera,
    faSquareCheck,
    faMarker,
    faLock,
    faEyeSlash,
    faEye,
    faUpload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateCoursePage() {
    // const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

    const [resizedImage, setResizedImage] = useState("");
    const [originalImage, setOriginalImage] = useState("");
    const [resizedImageSize, setResizedImageSize] = useState({ width: 0, height: 0 });
    const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

    const [croppedImage, setCroppedImage] = useState("");

    const [showImageModal, setShowImageModal] = useState(false);

    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [price, setPrice] = useState("");
    const [beginning, setBeginning] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");

    const handleSaveCroppedImage = (evt) => {
        evt.preventDefault();
        setShowImageModal(false)
    }

    const handleEditorDataChange = (newData) => {
        setDescription(newData);
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        let formatStart = new Date(`1995-12-17T${start}:00`).getTime();
        let formatEnd = new Date(`1995-12-17T${end}:00`).getTime();

        let milliseconds = formatEnd - formatStart;


        let newCourse = {
            title: title,
            creator: creator,
            image: originalImage,
            croppedImage: croppedImage,
            price: parseInt(price),
            beginning: beginning,
            start: start,
            end: end,
            duration: milliseconds,
            description: description
        };
        console.log("🚀 ~ file: CreateCoursePage.jsx:36 ~ handleSubmit ~ newCourse:", newCourse);

        try {
            let response = await axios.post(BASE_URL_PROTECTED + "createcourse", newCourse, {
                withCredentials: true
            });
            setMessage("Kurs erfolgreich erstellt!");
            console.log(response);
        } catch (error) {
            console.log(error);
            setMessage("Kurserstellung nicht erfolgreich - Bitte Eingabe prüfen!");
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
        if (hours === 0) return `${minutes} m`;
        if (minutes === 0) return `${hours} h`;
        return `${hours} h and ${minutes} m`;
    }

    function handleImageModalClose() {
        setShowImageModal(false);
    }

    const handleFileSelect = async (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(evt.target.files[0]);
        fileReader.onloadend = async (evt) => {
            const fileData = fileReader.result;

            let body = {
                image: fileData,
                folder: "course",
                id: crypto.randomUUID()
            };

            try {
                let response = await axios.post(BASE_URL_PUBLIC + "upload", body);

                let url = 'https://res.cloudinary.com/dppp3plo6/image/upload/v1683273590/'+response.data.url
                setOriginalImage(url);

            } catch (error) {
                console.error(error);
            }

            // setOriginalImage(
            //     "https://res.cloudinary.com/dppp3plo6/image/upload/v1683273590/course/31f5e254-8554-41f2-9e32-1a8cb8e83831.jpg"
            // );

            setShowImageModal(true);
        };
    };

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
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label>Creator</label>
                <input
                    type="text"
                    id="creator"
                    value={creator}
                    placeholder="Creator"
                    onChange={(event) => setCreator(event.target.value)}
                />

                <label>Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    placeholder="Price"
                    onChange={(event) => setPrice(event.target.value)}
                />

                <label>Beginning</label>
                <input
                    type="date"
                    id="beginning"
                    value={beginning}
                    placeholder="Beginning"
                    onChange={(event) => setBeginning(event.target.value)}
                />

                <label>Start</label>
                <input
                    type="time"
                    id="start"
                    value={start}
                    placeholder="Start"
                    onChange={(event) => setStart(event.target.value)}
                />

                <label>End</label>
                <input
                    type="time"
                    id="end"
                    value={end}
                    placeholder="End"
                    onChange={(event) => setEnd(event.target.value)}
                />

                <label htmlFor="image">Place Image</label>
                <input type="file" accept="image/*" id="image" onChange={handleFileSelect} />

                {(croppedImage && !showImageModal) && <img src={croppedImage} />}

                <label>Description</label>
                {/* <textarea
                    id="description"
                    value={description}
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                /> */}

                <MyEditor onDataChange={handleEditorDataChange} />

                <button type="submit">Create Course</button>
            </form>
            {showImageModal && (
                <div className="modalOverlay">
                    {/* style={{width: `${screenSize.width*0.9}px`, height: `${screenSize.height*0.9}px`}} */}
                    <div className="pictureModal">
                        <ImageCrop originalImage={originalImage} setCroppedImage={setCroppedImage} />

                        <div className="pictureModalButtons">
                            <form onClick={handleSaveCroppedImage}>
                                <fieldset className="fileInput">
                                    <label htmlFor="file-input" className="file-input-label">
                                        <FontAwesomeIcon icon={faUpload} />
                                    </label>
                                    <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} />
                                </fieldset>
                                <fieldset>
                                    <button type="button" onClick={handleImageModalClose}>
                                        Cancel
                                    </button>
                                    <button type="submit">Save</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {message}
        </div>
    );
}
