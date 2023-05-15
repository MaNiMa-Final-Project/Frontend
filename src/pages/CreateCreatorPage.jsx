import { useEffect, useState } from "react";
import { BASE_URL_PROTECTED } from "../service/config.js";
import axios from "axios";

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

import ImageCrop from "../shared/CropImage/ImageCrop";

export default function CreateCreatorPage() {
    const [nickName, setNickName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [message, setMessage] = useState("");
    // const [image, setImage] = useState(
    //     "https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/users/5324000f-428b-4956-9695-279a62d908b7.png"
    // );

    // const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

    const [showImageModal, setShowImageModal] = useState(false);

    const [resizedImage, setResizedImage] = useState("");
    const [originalImage, setOriginalImage] = useState(
        "https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/users/5324000f-428b-4956-9695-279a62d908b7.png"
    );
    const [resizedImageSize, setResizedImageSize] = useState({ width: 0, height: 0 });
    const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

    const [croppedImage, setCroppedImage] = useState(null);

    function checkForm() {
        return (
            nickName.trim().length > 0 &&
            firstName.trim().length > 0 &&
            lastName.trim().length > 0 &&
            password.length > 0 &&
            confirmedPassword.length > 0 &&
            !passwordMismatch
        );
    }

    // //screensize
    // useEffect(() => {
    //     function handleResize() {
    //         setScreenSize({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         });
    //     }

    //     // Add a resize event listener to update the screen size when the window is resized.
    //     window.addEventListener("resize", handleResize);

    //     // Call the handler once on mount to capture the initial screen size.
    //     handleResize();

    //     // Remove the resize event listener when the component unmounts.
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (originalImage) {
    //         let img = new Image();
    //         img.src = originalImage;

    //         //img.src = 'https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg'

    //         img.onload = function () {
    //             let newSize = calculateImageSize(
    //                 screenSize.width,
    //                 screenSize.height,
    //                 img.naturalWidth,
    //                 img.naturalHeight
    //             );

    //             let splitImage = originalImage.split("upload");
    //             let scaledImage = splitImage[0] + `upload/w_${newSize.width},h_${newSize.height}` + splitImage[1];

    //             setResizedImage(scaledImage);
    //             setResizedImageSize({ width: newSize.width, height: newSize.height });
    //             setOriginalImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    //         };
    //     }
    // }, [originalImage]);

    const handleConfirmPasswordChange = (event) => {
        const confirmedValue = event.target.value;
        setConfirmedPassword(confirmedValue);

        if (password.length > 0 && password !== confirmedValue) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (confirmedPassword.length > 0 && confirmedPassword !== passwordValue) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (!checkForm()) {
            setMessage("Bitte füllen Sie alle Felder aus.");
            return;
        }

        try {
            let newCreator = {
                nickName: nickName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                image: originalImage
            };

            let response = await axios.post(BASE_URL_PROTECTED + "createcreator", newCreator, {
                withCredentials: true
            });

            if (response.status === 200) {
                setMessage("Benutzer wurde erfolgreich erstellt.");
            } else {
                setMessage(response.data);
            }

            //   setUsername('');
            //   setName('');
            //   setSurname('');
            //   setPassword('');
            //   setConfirmedPassword('');
            //   setPasswordMismatch(false);
            //   setImage(null);
        } catch (error) {
            console.error(error);
            setMessage("Es gab einen Fehler beim Erstellen des Benutzers. Bitte versuchen Sie es später noch einmal.");
        }
    }

    function handleBackButton() {
        // Zurück-Button-Logik hier implementieren
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
            console.log("🚀 ------------------------------------------------🚀");
            console.log("🚀 ~ file: CreateCoursePage.jsx:178 ~ body:", body);
            console.log("🚀 ------------------------------------------------🚀");

            // try {
            //     // let response = await axios.post(BASE_URL_PUBLIC + "upload", body);
            //     // setOriginalImage(response.data.url);
            //     // console.log("🚀 ~ file: ImageCrop.jsx:47 ~ response.data.url:", response.data.url);

            // } catch (error) {
            //     console.error(error);
            // }

            setOriginalImage(
                "https://res.cloudinary.com/dppp3plo6/image/upload/v1683273590/course/31f5e254-8554-41f2-9e32-1a8cb8e83831.jpg"
            );

            setShowImageModal(true);
        };
    };

    return (
        <div className="logreg">
            <h2>Dozenten Nutzerkonto erstellen</h2>
            <form className="logreg-form" onSubmit={handleSubmit} noValidate>
                <input
                    type="text"
                    name="nickName"
                    placeholder="Benutzername"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    name="surname"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password" name="password" placeholder="Passwort" onChange={handlePasswordChange} />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Passwort bestätigen"
                    onChange={handleConfirmPasswordChange}
                />

                {/* Hier ein Beispiel für das Hochladen eines Bildes */}
                <input type="file" accept="image/*" onChange={handleFileSelect} />

                {/* <ImageCrop                             
                    originalImage={originalImage}
                    setCroppedImage={setCroppedImage}
                />  */}

                {croppedImage ? (
                    <img src={croppedImage} style={{ marginBottom: "1rem" }} alt="Vorschau des ausgewählten Bilds" />
                ) : (
                    <img src={originalImage} style={{ marginBottom: "1rem" }} alt="Vorschau des ausgewählten Bilds" />
                )}

                {/* {originalImage && <img src={originalImage} style={{marginBottom: '1rem'}} alt="Vorschau des ausgewählten Bilds" />} */}

                <fieldset className="btn-group">
                    <button className="logreg-button" type="button" onClick={handleBackButton}>
                        Zurück
                    </button>

                    <button className="logreg-button" type="submit" disabled={!checkForm()}>
                        Anmelden
                    </button>
                </fieldset>

                <p>{message}</p>
                {passwordMismatch && <p style={{ color: "red" }}>Die Passwörter stimmen nicht überein.</p>}
            </form>
            {showImageModal && (
                <div className="modalOverlay">
                    {/* style={{width: `${screenSize.width*0.9}px`, height: `${screenSize.height*0.9}px`}} */}
                    <div className="pictureModal">
                        <ImageCrop originalImage={originalImage} setCroppedImage={setCroppedImage} />

                        <div className="pictureModalButtons">
                            <form onClick={handleSubmit}>
                                <fieldset className="fileInput">
                                    <label htmlFor="file-input" className="file-input-label">
                                        <FontAwesomeIcon icon={faUpload} />
                                    </label>
                                    <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} />
                                </fieldset>
                                <fieldset>
                                    <button type="button" onClick={() => setShowImageModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit">Save</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
