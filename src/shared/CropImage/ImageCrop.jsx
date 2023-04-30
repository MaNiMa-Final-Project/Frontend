
import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './imagecrop.scss'

import { BASE_URL_PUBLIC } from "../../service/config.js";
import axios from "axios";

const ImageCrop = ({ownImageWidth, existingImage}) => {


    const [crop, setCrop] = useState({});

    const [naturalWidth, setNaturalWidth] = useState('');
    const [naturalHeight, setNaturalHeight] = useState('');

    const [trigger, setTrigger] = useState(true)


    const [newImage, setNewImage] = useState('');

    const [selectedFile, setSelectedFile] = useState("")


    useEffect(()=>{
        if(existingImage) setSelectedFile(existingImage);
        else setSelectedFile(`https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/users/5324000f-428b-4956-9695-279a62d908b7.png`)
    
    }, [])

    //!anonymous https://res.cloudinary.com/dppp3plo6/image/upload/v1682773122/users/5324000f-428b-4956-9695-279a62d908b7.png

    //https://res.cloudinary.com/dppp3plo6/image/upload/v1682604705/users/RalfAckerman.jpg
    //https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg
    //
    
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
                setTrigger(true)      
                setSelectedFile(response.data.url);

                console.log("🚀 ~ file: ImageCrop.jsx:47 ~ response.data.url:", response.data.url)

                
                
            } catch (error) {
                console.error(error)
            }
        }
    };

    const handleCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const handleCropComplete = (crop, pixelCrop) => {

        console.log(crop, pixelCrop);

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
                pixelCrop.width,
                0,
                0,
                pixelCrop.width,
                pixelCrop.width
            );
            const croppedImageUrl = canvas.toDataURL();
            setNewImage(croppedImageUrl);
        }

        let splitedURL = selectedFile.split('upload')

        let originalKoordinates = calculateImageCoords(crop.x, crop.y)

        let renderRatio = naturalWidth / ownImageWidth;
        if(naturalWidth<ownImageWidth) renderRatio = 1

        let renderedCropSize = (crop.width*renderRatio).toFixed()

        let croppedImage = splitedURL[0]+`upload/c_crop,h_${renderedCropSize},w_${renderedCropSize},x_${originalKoordinates.imgX},y_${originalKoordinates.imgY}/c_scale,w_${crop.height.toFixed()}`+splitedURL[1];
        setNewImage(croppedImage)
    };

    // function adjustCropAspectRatio(width, height, crop) {
    //     const aspectRatio = width / height;
    //     const newCrop = { ...crop };
      
    //     // Falls die Breite größer als die Höhe ist, passt die Höhe an die Breite an
    //     if (crop.width > crop.height) {
    //       newCrop.height = crop.width / aspectRatio;
    //     }
    //     // Falls die Höhe größer als die Breite ist, passt die Breite an die Höhe an
    //     else if (crop.height > crop.width) {
    //       newCrop.width = crop.height * aspectRatio;
    //     }
      
    //     return newCrop;
    //   }


      

    function calculateImageCoords(divX, divY) {
        let aspectRatio;
        let ownImageHeight;
      
        // Überprüfe, ob die Breite oder die Höhe größer ist
        if (naturalWidth >= naturalHeight) {
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

            console.log("dADAdA");

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
                console.log("fafefa");           
            // Breite ist größer
            aspectRatio = width / height;
            ownImageHeight = ownImageWidth / aspectRatio;

            cropHeight = ownImageHeight * 0.7;
            cropWidth = ownImageHeight * 0.7;

            } else {
            // Höhe ist größer oder gleich
            aspectRatio = height / width;
            ownImageHeight = ownImageWidth * aspectRatio;
            console.log("🚀 -------------------------------------------------------------🚀")
            console.log("🚀 ~ file: ImageCrop.jsx:220 ~ ownImageHeight:", ownImageHeight)
            console.log("🚀 -------------------------------------------------------------🚀")


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

        {trigger ? 
        

        <div className='cropContainer' style={{width: `${ownImageWidth}px`}}>
            <ReactCrop
                crop={crop}
                circularCrop={true}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
                ruleOfThirds={true}
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
        :
        <div >
            <h1 style={{textAlign: 'center', fontSize: '2rem'}}>Profilfoto:</h1>
            <img style={{borderRadius: '50%', margin: '1rem auto'}} src={selectedFile} alt="" />
        </div>
        
        
        }

        


    </>
  );
};

export default ImageCrop;


