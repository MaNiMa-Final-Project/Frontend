import axios from "axios";
import { BASE_URL_PROTECTED, BASE_URL_PUBLIC } from "../../service/config";

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
import { useState, useRef, useEffect } from "react";
import "./sidebar.scss";
import ImageCrop from "../../shared/CropImage/ImageCrop";
import { BeatLoader } from "react-spinners";

const IMG_SIZE = 0.5;

export default function SideBar({ user }) {
    const [croppedImage, setCroppedImage] = useState(null);

    const [originalImage, setOriginalImage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState("");

    const inputRef = useRef(null);

    const [changeNickName, setChangeNickName] = useState(false);
    const [changeFirstName, setChangeFirstName] = useState(false);
    const [changeLastName, setChangeLastName] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        setUserData({
            nickName: user.nickName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image
        });

        setOriginalImage(user.image);


    }, [user]);


    const toggleShowPassword = (passwordType) => {
        if (passwordType === "old") {
            setShowOldPassword(!showOldPassword);
        } else if (passwordType === "new") {
            setShowNewPassword(!showNewPassword);
        } else if (passwordType === "confirm") {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    async function handleButtonClick(prevValue, ref, value) {
        inputRef.current.focus();

        if (prevValue === value) {
            console.log("same");
            setChangeFirstName(false);

            setChangeNickName(false);
            setChangeLastName(false);
            setChangeEmail(false);
            setConfirmPassword(false);
            return;
        }

        let body = {};
        body[ref] = value;

        try {
            let response = await axios.put(BASE_URL_PROTECTED + "edituser", body, {
                withCredentials: true
            });
            const updatedData = {};
            updatedData[ref] = response.data[ref];
            setUserData({
                ...userData,
                ...updatedData
            });

            setChangeNickName(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePasswordChange = async (event, oldPass, newPass, confirmPass) => {
        event.preventDefault();
        if (confirmPass === newPass) {
            try {
                let response = await axios.put(
                    BASE_URL_PROTECTED + "efoijgvaeipr",
                    {
                        oldPass: oldPass,
                        newPass: newPass
                    },
                    {
                        withCredentials: true
                    }
                );

                if (response.data.success) {
                    setMessage("Passwort erfolgreich geändert");

                    setTimeout(() => {
                        handlePasswordModalClose();
                    }, 500);
                } else {
                    setMessage("Passwort nicht korrekt");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessage("Passwörter stimmen nicht überein");
        }
    };

    function handlePasswordClick() {
        setChangeEmail(false);
        setChangeLastName(false);
        setChangeFirstName(false);
        setChangeNickName(false);
        setShowPasswordModal(true);
    }

    function handlePasswordModalClose() {
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage("");
    }

    function handleImageClick() {
        setShowImageModal(true);
        setChangeEmail(false);
        setChangeLastName(false);
        setChangeFirstName(false);
        setChangeNickName(false);
        setConfirmPassword(false);
    }

    function handleImageModalClose() {
        setShowImageModal(false);
    }

    const handleFileSelect = async (evt) => {

        setIsLoading(true)


        const fileReader = new FileReader();
        fileReader.readAsDataURL(evt.target.files[0]);
        fileReader.onloadend = async (evt) => {
            const fileData = fileReader.result;

            let body = {
                image: fileData,
                folder: "users",
                id: crypto.randomUUID()
            };

            try {
                let response = await axios.post(BASE_URL_PUBLIC + "upload", body);

                let newPic = 'https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/'+response.data.url+'.png'

                if(response.status === 200) {
                    setIsLoading(false)
                    setOriginalImage(newPic);


                }


            } catch (error) {
                console.error(error);
            }
        };
    };

    const handleSubmit = async (event) => {
        console.log("fasfsa");
        event.preventDefault();
        try {
            let response = await axios.put(
                BASE_URL_PROTECTED + "edituser",
                {
                    croppedImage: croppedImage
                },
                {
                    withCredentials: true
                }
            );
            console.log("🚀 -----------------------------------------------🚀")
            console.log("🚀 ~ file: SideBar.jsx:220 ~ response:", response)
            console.log("🚀 -----------------------------------------------🚀")
            if (response.status === 200) {
                setCroppedImage(response.data.croppedImage);
                handleImageModalClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        user && (
            <div className="profileSideBar">
                <div className="profilePicture">
                    {croppedImage ? <img src={user.croppedImage} alt="" /> : <img src={user.image} alt="" />}
                </div>
                <button type="button" onClick={handleImageClick}>
                    <FontAwesomeIcon className="icons" icon={faCamera} />
                </button>
                <div className="personalSettings">
                    <div className="settingsInnerContainer">
                        <div className="srcBtn">
                            {changeNickName ? (
                                <input type="text" defaultValue={userData.nickName} ref={inputRef} />
                            ) : (
                                <p>{userData.nickName}</p>
                            )}
                            {changeNickName ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleButtonClick(userData.nickName, "nickName", inputRef.current.value);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faSquareCheck} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChangeNickName(true);
                                        setChangeFirstName(false);
                                        setChangeLastName(false);
                                        setChangeEmail(false);
                                        setConfirmPassword(false);
                                        // setTimeout(handleButtonClick, 0);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faMarker} />
                                </button>
                            )}
                        </div>
                        <div className="srcBtn">
                            {changeFirstName ? (
                                <input type="text" defaultValue={userData.firstName} ref={inputRef} />
                            ) : (
                                <p>{userData.firstName}</p>
                            )}
                            {changeFirstName ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleButtonClick(userData.firstName, "firstName", inputRef.current.value);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faSquareCheck} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChangeFirstName(true);

                                        setChangeNickName(false);
                                        setChangeLastName(false);
                                        setChangeEmail(false);
                                        setConfirmPassword(false);
                                        // setTimeout(handleButtonClick, 0);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faMarker} />
                                </button>
                            )}
                        </div>
                        <div className="srcBtn">
                            {changeLastName ? (
                                <input type="text" defaultValue={userData.lastName} ref={inputRef} />
                            ) : (
                                <p>{userData.lastName}</p>
                            )}
                            {changeLastName ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleButtonClick(userData.lastName, "lastName", inputRef.current.value);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faSquareCheck} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChangeLastName(true);

                                        setChangeFirstName(false);
                                        setChangeNickName(false);
                                        setChangeEmail(false);
                                        setConfirmPassword(false);
                                        // setTimeout(handleButtonClick, 0);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faMarker} />
                                </button>
                            )}
                        </div>
                        <div className="srcBtn">
                            {changeEmail ? (
                                <input type="email" defaultValue={userData.email} ref={inputRef} />
                            ) : (
                                <p>{userData.email}</p>
                            )}
                            {changeEmail ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleButtonClick(userData.email, "email", inputRef.current.value);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faSquareCheck} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChangeEmail(true);

                                        setChangeLastName(false);
                                        setChangeFirstName(false);
                                        setChangeNickName(false);
                                        setConfirmPassword(false);
                                        // setTimeout(handleButtonClick, 0);
                                    }}
                                >
                                    <FontAwesomeIcon className="icons" icon={faMarker} />
                                </button>
                            )}
                        </div>
                        <div className="srcBtn">
                            <span>
                                <FontAwesomeIcon className="icons" icon={faLock} />
                                Password
                            </span>
                            <button type="button" onClick={handlePasswordClick}>
                                <FontAwesomeIcon className="icons" icon={faMarker} />
                            </button>
                        </div>
                    </div>
                </div>

                {showPasswordModal && (
                    <div className="settingModalOverlay">
                        <div className="pwModalContent">
                            <h2>Change Password</h2>
                            <form
                                className="pwForm"
                                onSubmit={(event) =>
                                    handlePasswordChange(event, oldPassword, newPassword, confirmPassword)
                                }
                            >
                                <fieldset className="outerFieldset">
                                    <label htmlFor="oldPassword">Old Password:</label>

                                    <fieldset className="innerFieldset">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            id="oldPassword"
                                            name="oldPassword"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => toggleShowPassword("old")}>
                                            {showOldPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </fieldset>

                                    <label htmlFor="newPassword">New Password:</label>
                                    <fieldset className="innerFieldset">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            id="newPassword"
                                            name="newPassword"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => toggleShowPassword("new")}>
                                            {showNewPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </fieldset>

                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <fieldset className="innerFieldset">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => toggleShowPassword("confirm")}>
                                            {showConfirmPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </fieldset>

                                    {message === "Passwort erfolgreich geändert" ? (
                                        <p style={{ color: "green" }}>{message}</p>
                                    ) : (
                                        <p>{message}</p>
                                    )}
                                </fieldset>
                                <div className="pwModalButtons">
                                    <button type="button" onClick={handlePasswordModalClose}>
                                        Cancel
                                    </button>
                                    <button type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showImageModal && (
                    <div className="settingModalOverlay">
                        {/* style={{width: `${screenSize.width*0.9}px`, height: `${screenSize.height*0.9}px`}} */}
                        <div className="pictureModal">
                            {isLoading ? <BeatLoader isLoading={isLoading} /> : <ImageCrop originalImage={originalImage} setCroppedImage={setCroppedImage} />}

                            <div className="pictureModalButtons">
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="fileInput">
                                        <label htmlFor="file-input" className="file-input-label">
                                            <FontAwesomeIcon icon={faUpload} />
                                        </label>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                        />
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
            </div>
        )
    );
}
