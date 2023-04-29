
import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../LogReg/logreg.scss'

import { BASE_URL_PUBLIC } from "../../service/config.js";
import axios from "axios";

const ImageCrop = ({ownImageWidth}) => {


    const [crop, setCrop] = useState({});

    const [naturalWidth, setNaturalWidth] = useState('');
    const [naturalHeight, setNaturalHeight] = useState('');


    const [newImage, setNewImage] = useState('');

    //https://res.cloudinary.com/dppp3plo6/image/upload/v1682604705/users/RalfAckerman.jpg
    //https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg
    //
    const [selectedFile, setSelectedFile] = useState(`https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg`)
    
    const handleFileSelect = async (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(evt.target.files[0]);
        fileReader.onloadend = async (evt) => {
            const fileData = fileReader.result;

            let body = {
                image: fileData,
                folder: 'users',
                id: crypto.randomUUID()
            }

            try {

                let response = await axios.post(BASE_URL_PUBLIC + 'upload', body)      

                console.log("🚀 ~ file: ImageCrop.jsx:39 ~ response.data:", response.data.url)


                let splitedURL = response.data.url.split('upload')
                console.log("🚀 ~ file: ImageCrop.jsx:40 ~ splitedURL:", splitedURL)
                let resizedImage = splitedURL[0]+`upload/w_${ownImageWidth}`+splitedURL[1]

                console.log("🚀 ~ file: ImageCrop.jsx:45 ~ resizedImage:", resizedImage)
                setSelectedFile(resizedImage);
                
                
            } catch (error) {
                console.error(error)
            }
        }
    };

    const handleCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const handleCropComplete = (crop, pixelCrop) => {


        const canvas = document.createElement('canvas');
        canvas.className = 'canvas';
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
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
        const croppedImageUrl = canvas.toDataURL();
        setNewImage(croppedImageUrl);
        }

        let splitedURL = selectedFile.split('upload')

        let originalKoordinates = calculateImageCoords(crop.x, crop.y)


        const renderRatio = naturalWidth / ownImageWidth;
        if(naturalWidth<ownImageWidth) renderRatio = 1

        let renderedCropSize = (crop.width*renderRatio).toFixed()

        let croppedImage = splitedURL[0]+`upload/c_crop,h_${renderedCropSize},w_${renderedCropSize},x_${originalKoordinates.imgX},y_${originalKoordinates.imgY}/c_scale,w_${crop.height.toFixed()}`+splitedURL[1];

        console.log("🚀 ~ file: ImageCrop.jsx:93 ~ croppedImage:", croppedImage)

        setNewImage(croppedImage)

    };


      

    function calculateImageCoords(divX, divY) {
        let aspectRatio;
        let ownImageHeight;
      
        // Überprüfe, ob die Breite oder die Höhe größer ist
        if (naturalWidth > naturalHeight) {
          // Breite ist größer
          aspectRatio = naturalWidth / naturalHeight;
          ownImageHeight = ownImageWidth / aspectRatio;
          
        } else {
          // Höhe ist größer oder gleich
          aspectRatio = naturalHeight / naturalWidth;
          ownImageHeight = ownImageWidth * aspectRatio;
        }
      
        // Berechne Skalierungsfaktor für Breite
        const scaleX = ownImageWidth / naturalWidth;
      
        // Berechne Skalierungsfaktor für Höhe
        const scaleY = ownImageHeight / naturalHeight;
      
        // Berechne x-Koordinate des ausgewählten Punkts im Foto in Originalgröße
        const imgX = Math.ceil(divX / scaleX);
      
        // Berechne y-Koordinate des ausgewählten Punkts im Foto in Originalgröße
        const imgY = Math.ceil(divY / scaleY);
      
        // Gib die berechneten Koordinaten aus
        console.log(`Die Koordinaten (${divX}, ${divY}) im Bild mit Breite ${ownImageWidth}px und Höhe ${ownImageHeight}px entsprechen den Koordinaten (${imgX}, ${imgY}) im Originalbild.`);

        return {
            imgX: imgX,
            imgY: imgY
        }
    }
      
      


      function onImageLoad(e) {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        setNaturalWidth(width);
        setNaturalHeight(height);

        let aspectRatio;
        let ownImageHeight;
        if (width < ownImageWidth) {

            const imageSize = {
                width: width,
                height: width 
                };
            
                const cropWidth = imageSize.width * 0.9; 
                const cropHeight = imageSize.height * 0.9; 
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
                unit: 'px',
                x: pixelCrop.x,
                y: pixelCrop.y,
                width: pixelCrop.width,
                height: pixelCrop.height,
                };
            
                setCrop(percentCrop);

        } else {

            let cropWidth;
            let cropHeight;

            if (width > height) {
                console.log('Breite ist größer');
                
            // Breite ist größer
            aspectRatio = width / height;
            ownImageHeight = ownImageWidth / aspectRatio;

            cropHeight = ownImageHeight * 0.7;
            cropWidth = ownImageHeight * 0.7;

            } else {
                console.log('Höhe ist größer');

            // Höhe ist größer oder gleich
            aspectRatio = height / width;
            ownImageHeight = ownImageWidth * aspectRatio;


            cropHeight = ownImageWidth * 0.7;
            cropWidth = ownImageWidth * 0.7;

            }


            const cropPosition = {
            x: (ownImageWidth - cropWidth) / 2,
            y: (ownImageHeight - cropHeight) / 2
            };
        
            const pixelCrop = {
            x: cropPosition.x,
            y: cropPosition.y,
            width: cropWidth,
            height: cropHeight
            };
        
            const percentCrop = {
            unit: 'px',
            x: pixelCrop.x,
            y: pixelCrop.y,
            width: pixelCrop.width,
            height: pixelCrop.height,
            };
        
            setCrop(percentCrop);
        }
      

      }
      

      
  
  

  

  return (
    <>

        <input type="file" accept="image/*" onChange={handleFileSelect} />

        
        <div className='cropContainer' style={{width: `${ownImageWidth}px`}}>
            <ReactCrop
                crop={crop}
                circularCrop={true}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
            >
                <img
                    src={selectedFile}
                    onLoad={onImageLoad}
                />
            </ReactCrop>

            <div className='croppedImageContainer' style={{width: `${ownImageWidth}px`}}>
                {newImage && <img className='croppedImage' style={{height: `${crop.height}px`}} src={newImage} alt="Zugeschnittenes Bild" />}
            </div>
        </div>

    </>
  );
};

export default ImageCrop;


