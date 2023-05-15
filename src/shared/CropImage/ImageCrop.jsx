import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./imagecrop.scss";

import BeatSpinner from "../Spinners/BeatLoader";

import screenSize from "../ScreenSize/screenSize";

const CROP_SIZE = 0.8;
const IMG_VIEW_SIZE = 300;

const IMG_SIZE = 0.5;

const ImageCrop = ({ originalImage, setCroppedImage }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [resizedImage, setResizedImage] = useState("");
    const [originalSize, setOriginalSize] = useState("");

    const [resizedImageSize, setResizedImageSize] = useState({ width: 0, height: 0 });
    const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

    // const [croppedImage, setCroppedImage] = useState("");

    const [crop, setCrop] = useState({});

    const [naturalWidth, setNaturalWidth] = useState("");
    const [naturalHeight, setNaturalHeight] = useState("");

    const [trigger, setTrigger] = useState(true);

    const [showCroppedImage, setShowCroppedImage] = useState("");

    const [selectedFile, setSelectedFile] = useState("");

    useEffect(() => {
        if (resizedImage) setSelectedFile(resizedImage);
    }, [resizedImage]);

    useEffect(() => {
        if (originalImage) {
            let img = new Image();
            img.src = originalImage;

            //img.src = 'https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg'

            img.onload = function () {
                let newSize = calculateImageSize(
                    screenSize().width,
                    screenSize().height,
                    img.naturalWidth,
                    img.naturalHeight
                );

                let splitImage = originalImage.split("upload");
                let scaledImage = splitImage[0] + `upload/w_${newSize.width},h_${newSize.height}` + splitImage[1];

                console.log("🚀 ------------------------------------------------------🚀");
                console.log("🚀 ~ file: ImageCrop.jsx:64 ~ scaledImage:", scaledImage);
                console.log("🚀 ------------------------------------------------------🚀");

                setResizedImage(scaledImage);
                setResizedImageSize({ width: newSize.width, height: newSize.height });
                setOriginalImageSize({ width: img.naturalWidth, height: img.naturalHeight });
                setIsLoading(false);
            };
        }
    }, [originalImage]);

    function calculateImageSize(screenWidth, screenHeight, imageWidth, imageHeight) {
        let newWidth = null;
        let newHeight = null;

        if (imageWidth >= screenWidth || imageHeight >= screenHeight) {
            if (imageWidth / screenWidth > imageHeight / screenHeight) {
                newWidth = screenWidth;
                newHeight = Math.floor(imageHeight * (screenWidth / imageWidth));
            } else {
                newHeight = screenHeight;
                newWidth = Math.floor(imageWidth * (screenHeight / imageHeight));
            }
        } else {
            newWidth = screenWidth;
            newHeight = screenHeight;
        }

        return { width: Math.floor(newWidth * IMG_SIZE), height: Math.floor(newHeight * IMG_SIZE) };
    }

    //!anonymous https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/users/5324000f-428b-4956-9695-279a62d908b7.png

    const handleCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const handleCropComplete = (crop, pixelCrop) => {
        const canvas = document.createElement("canvas");
        canvas.className = "canvas";
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous"; // set crossOrigin attribute
        img.onload = () => {
            ctx.drawImage(
                img,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );
            // const croppedImageUrl = canvas.toDataURL();
            // croppedImage(croppedImageUrl);
        };

        let originalCoordinates = calculateImageCoords(crop.x, crop.y);

        let renderRatio = originalImageSize.width / naturalWidth;

        if (naturalWidth > originalImageSize.width) renderRatio = 1;
        let renderedCropSize = Math.floor(crop.width * renderRatio);

        let splitedURL = originalImage.split("upload");

        let croppedImage =
            splitedURL[0] +
            `upload/c_crop,h_${renderedCropSize},w_${renderedCropSize},x_${originalCoordinates.imgX},y_${originalCoordinates.imgY}/c_scale,w_${IMG_VIEW_SIZE}` +
            splitedURL[1];

        setShowCroppedImage(croppedImage);
        setCroppedImage(croppedImage);
    };

    function calculateImageCoords(divX, divY) {
        let aspectRatio;
        let ownImageHeight;

        // Überprüfe, ob die Breite oder die Höhe größer ist
        if (naturalWidth >= naturalHeight) {
            // Breite ist größer
            aspectRatio = naturalWidth / naturalHeight;
            ownImageHeight = resizedImageSize.width / aspectRatio;
        } else {
            // Höhe ist größer oder gleich
            aspectRatio = naturalHeight / naturalWidth;
            ownImageHeight = resizedImageSize.width * aspectRatio;
        }

        // Berechne Skalierungsfaktor für Breite
        const scaleX = resizedImageSize.width / originalImageSize.width;

        // Berechne Skalierungsfaktor für Höhe
        const scaleY = resizedImageSize.height / originalImageSize.height;

        // Berechne x-Koordinate des ausgewählten Punkts im Foto in Originalgröße
        const imgX = Math.ceil(divX / scaleX);

        // Berechne y-Koordinate des ausgewählten Punkts im Foto in Originalgröße
        const imgY = Math.ceil(divY / scaleY);

        // Gib die berechneten Koordinaten aus
        //console.log(`Die Koordinaten (${divX}, ${divY}) im Bild mit Breite ${imageSize.width}px und Höhe ${imageSize.width}px entsprechen den Koordinaten (${imgX}, ${imgY}) im Originalbild.`);

        return {
            imgX: imgX.toFixed(),
            imgY: imgY.toFixed()
        };
    }

    function onImageLoad(e) {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        setNaturalWidth(width);
        setNaturalHeight(height);

        if (width >= height) {
            const imageSize = {
                width: width,
                height: height
            };

            const cropWidth = imageSize.height * CROP_SIZE;
            const cropHeight = imageSize.height * CROP_SIZE;
            const cropPosition = {
                x: (imageSize.width - cropWidth) / 2,
                y: (imageSize.height - cropHeight) / 2
            };

            const pixelCrop = {
                x: cropPosition.x,
                y: cropPosition.y,
                width: cropWidth,
                height: cropHeight
            };

            const percentCrop = {
                unit: "px",
                x: Math.floor(pixelCrop.x),
                y: Math.floor(pixelCrop.y),
                width: Math.floor(pixelCrop.height),
                height: Math.floor(pixelCrop.height)
            };

            setCrop(percentCrop);
        } else {
            const imageSize = {
                width: width,
                height: height
            };

            const cropWidth = imageSize.width * CROP_SIZE;
            const cropHeight = imageSize.width * CROP_SIZE;

            const cropPosition = {
                x: (imageSize.width - cropWidth) / 2,
                y: (imageSize.height - cropHeight) / 2
            };

            const pixelCrop = {
                x: cropPosition.x,
                y: cropPosition.y,
                width: cropWidth,
                height: cropHeight
            };

            const percentCrop = {
                unit: "px",
                x: Math.floor(pixelCrop.x),
                y: Math.floor(pixelCrop.y),
                width: Math.floor(pixelCrop.width),
                height: Math.floor(pixelCrop.width)
            };

            setCrop(percentCrop);
        }
    }

    let croppedContainerSize = showCroppedImage
        ? { width: `${IMG_VIEW_SIZE + 20}px`, height: `${IMG_VIEW_SIZE + 20}px` }
        : { width: `${0}px`, height: `${0}px` };

    return (
        <>
            {trigger ? (
                <div className="cropContainer">
                    <div className="cropToolContainer">
                        <ReactCrop
                            crop={crop}
                            circularCrop={true}
                            onChange={handleCropChange}
                            onComplete={handleCropComplete}
                            ruleOfThirds={true}
                            className="cropTool"
                        >
                            {isLoading ? (
                                <BeatSpinner isLoading={isLoading} />
                            ) : (
                                <img src={resizedImage} onLoad={onImageLoad} />
                            )}
                        </ReactCrop>
                    </div>

                    <div className="croppedImageContainer" style={croppedContainerSize}>
                        {showCroppedImage && <img src={showCroppedImage} alt="Zugeschnittenes Bild" />}
                    </div>
                </div>
            ) : (
                <div>
                    <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Profilfoto:</h1>
                    <img style={{ borderRadius: "50%", margin: "1rem auto" }} src={selectedFile} alt="" />
                </div>
            )}
        </>
    );
};

export default ImageCrop;
