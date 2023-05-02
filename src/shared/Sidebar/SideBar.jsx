import axios from 'axios';
import { BASE_URL_PROTECTED } from '../../service/config';

import { faCamera, faSquareCheck, faMarker, faLock, faEyeSlash, faEye, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import './sidebar.scss';
import ImageCrop from '../../shared/CropImage/ImageCrop'


export default function SideBar({user}){
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [resizedImageSize, setResizedImageSize] = useState({ width: 0, height: 0 });
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 })


  const [image, setImage] = useState('');
  const [originalImage, setOriginalImage] = useState('')

  const [userData, setUserData] = useState("");
  const inputRef = useRef(null);

  const [changeNickName, setChangeNickName] = useState(false);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //screensize
  useEffect(() => {
      function handleResize() {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }

      // Add a resize event listener to update the screen size when the window is resized.
      window.addEventListener('resize', handleResize);

      // Call the handler once on mount to capture the initial screen size.
      handleResize();

      // Remove the resize event listener when the component unmounts.
      return () => {
        window.removeEventListener('resize', handleResize);
      };

      
  }, []);

  useEffect(()=>{
        setUserData({
          nickName: user.nickName,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image
        });

        setOriginalImage(user.image)

        if(user) {
          let img = new Image();
          img.src = user.image;
          //img.src = 'https://res.cloudinary.com/dppp3plo6/image/upload/v1682604112/users/ChristinaEisenberg.jpg'

          img.onload = function() {
            let newSize = calculateImageSize(screenSize.width, screenSize.height, img.naturalWidth, img.naturalHeight)
            let splitImage = user.image.split('upload');
            let scaledImage = splitImage[0]+`upload/w_${newSize.width},h_${newSize.height}`+splitImage[1];
            setImage(scaledImage);
            setResizedImageSize({ width: newSize.width, height: newSize.height })

          };

          //  console.log(screenSize);
          //  console.log(`Image size: ${img.naturalWidth} x ${img.naturalHeight}`);
          //  console.log('image '+image);


          setOriginalImageSize({ width: img.naturalWidth, height: img.naturalHeight })

        }

  },[user])

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
    }
  
    return { width: (newWidth*0.7).toFixed(), height: (newHeight*0.7).toFixed() };
  }
  
  
  
  
  

  


  const toggleShowPassword = (passwordType) => {
    if (passwordType === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (passwordType === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  async function handleButtonClick(prevValue, ref, value) {
    inputRef.current.focus();

    if(prevValue === value) return

    let body = {};
    body[ref] = value;

    try {

      let response = await axios.put(BASE_URL_PROTECTED+'edituser', body, {
        withCredentials: true
      })
      const updatedData = {};
      updatedData[ref] = response.data[ref];
      setUserData({
        ...userData,
        ...updatedData
      });
    } catch (error) {
      console.error(error)
    }
  }

  const handlePasswordChange = (event, oldPass, newPass, confirmPass) => {

    if(confirmPass === newPass) {
      console.log("eingabe gut");
    }


    console.log("🚀 ----------------------------------------------------🚀")
    console.log("🚀 ~ file: SideBar.jsx:33 ~ confirmPass:", confirmPass)
    console.log("🚀 ----------------------------------------------------🚀")
    console.log("🚀 --------------------------------------------🚀")
    console.log("🚀 ~ file: SideBar.jsx:33 ~ newPass:", newPass)
    console.log("🚀 --------------------------------------------🚀")
    console.log("🚀 --------------------------------------------🚀")
    console.log("🚀 ~ file: SideBar.jsx:33 ~ oldPass:", oldPass)
    console.log("🚀 --------------------------------------------🚀")
    event.preventDefault();

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
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  function handleImageClick() {
    setShowImageModal(true);
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
            folder: 'users',
            id: crypto.randomUUID()
        }

        try {

            let response = await axios.post(BASE_URL_PUBLIC + 'upload', body)
            // setTrigger(true)      
            // setSelectedFile(response.data.url);

            console.log("🚀 ~ file: ImageCrop.jsx:47 ~ response.data.url:", response.data.url)

            
            
        } catch (error) {
            console.error(error)
        }
    }
};

  return(
    user && <div className="profileSideBar" style={{border: 'solid'}}>

      <div className='profilePicture'>
        <img src={user.image} alt="" />
      </div>
      <button type='button' onClick={() => setShowImageModal(true)}><FontAwesomeIcon className='icons' icon={faCamera} /></button>
      <div className='personalSettings'>
        <div className='settingsInnerContainer'>
            <div className='srcBtn'>
                {changeNickName ? (
                    <input 
                    type="text" 
                    defaultValue={userData.nickName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{userData.nickName}</p>
                )}
                {changeNickName ? (
                    <button 
                    type='button' 
                    onClick={()=> {
                      setChangeNickName(false);
                      handleButtonClick(userData.nickName, "nickName", inputRef.current.value);
                    }}
                    
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeNickName(true);
                        setChangeFirstName(false);
                        setChangeLastName(false);
                        setChangeEmail(false);
                        setConfirmPassword(false);
                        setTimeout(handleButtonClick, 0);
                    }}  
                    >
                    <FontAwesomeIcon className='icons' icon={faMarker} /> 
                    </button>
                )}
            </div>
            <div className='srcBtn'>
                {changeFirstName ? (
                    <input 
                    type="text" 
                    defaultValue={userData.firstName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{userData.firstName}</p>
                )}
                {changeFirstName ? (
                    <button 
                    type='button'
                    onClick={()=> {
                      setChangeFirstName(false);
                      handleButtonClick(userData.firstName, "firstName", inputRef.current.value);
                    }}
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeFirstName(true);

                        setChangeNickName(false);
                        setChangeLastName(false);
                        setChangeEmail(false);
                        setConfirmPassword(false);
                        setTimeout(handleButtonClick, 0);
                    }}  
                    >
                    <FontAwesomeIcon className='icons' icon={faMarker} /> 
                    </button>
                )}
            </div>
            <div className='srcBtn'>
                {changeLastName ? (
                    <input 
                    type="text" 
                    defaultValue={userData.lastName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{userData.lastName}</p>
                )}
                {changeLastName ? (
                    <button 
                    type='button' lastName
                    onClick={()=> {
                      setChangeLastName(false);
                      handleButtonClick(userData.lastName,"lastName", inputRef.current.value);
                    }}
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                      setChangeLastName(true);

                      setChangeFirstName(false);
                      setChangeNickName(false);
                      setChangeEmail(false);
                      setConfirmPassword(false);
                      setTimeout(handleButtonClick, 0);
                    }}  
                    >
                    <FontAwesomeIcon className='icons' icon={faMarker} /> 
                    </button>
                )}
            </div>     
            <div className='srcBtn'>
                {changeEmail ? (
                    <input 
                    type="email" 
                    defaultValue={userData.email} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{userData.email}</p>
                )}
                {changeEmail ? (
                    <button 
                    type='button'
                    onClick={()=> {
                      setChangeEmail(false);
                      handleButtonClick(userData.email,"email",inputRef.current.value);
                    }}
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeEmail(true);

                        setChangeLastName(false);
                        setChangeFirstName(false);
                        setChangeNickName(false);
                        setConfirmPassword(false);
                        setTimeout(handleButtonClick, 0);
                    }}  
                    >
                    <FontAwesomeIcon className='icons' icon={faMarker} /> 
                    </button>
                )}
            </div>
            <div className='srcBtn'>
                <span>
                <FontAwesomeIcon className='icons' icon={faLock} />
                Password
                </span>
                <button 
                type='button'
                onClick={handlePasswordClick}
                >
                <FontAwesomeIcon className='icons' icon={faMarker} /> 
                </button>
            </div>
        </div>
      </div> :

      {showPasswordModal && (
        <div className='modalOverlay'>
          <div className='modalContent'>
            <h2>Change Password</h2>
            <form onSubmit={(event) => handlePasswordChange(event, oldPassword, newPassword, confirmPassword)} >
                <fieldset className='outerFieldset'>
                <label htmlFor='oldPassword'>Old Password:</label>

                <fieldset className='innerFieldset'>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    id='oldPassword'
                    name='oldPassword'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button type='button' onClick={() => toggleShowPassword('old')}>
                    {showOldPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </fieldset>

              <label htmlFor='newPassword'>New Password:</label>
              <fieldset className='innerFieldset'>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id='newPassword'
                  name='newPassword'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type='button' onClick={() => toggleShowPassword('new')}>
                  {showNewPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
              </fieldset>

              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <fieldset className='innerFieldset'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='button' onClick={() => toggleShowPassword('confirm')}>
                  {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
              </fieldset>

                </fieldset>
              <div className='modalButtons'>
                <button 
                  type='button'
                  onClick={handlePasswordModalClose}
                >
                  Cancel
                </button>
                <button type='submit'>Save</button>
              </div>
            </form>

          </div>  
        </div>
      )}

      {showImageModal && (
        <div className='modalOverlay' >
        {/* style={{width: `${screenSize.width*0.9}px`, height: `${screenSize.height*0.9}px`}} */}
          <div className='pictureModal' >

            <ImageCrop 
              originalImageSize={originalImageSize} 
              resizedImageSize={resizedImageSize} 
              resizedImage={image}
              originalImage={originalImage}
            />

            <div className='pictureModalButtons'>
              <form>
              <fieldset className='fileInput'>
                <label htmlFor="file-input" className="file-input-label">
                  <FontAwesomeIcon icon={faUpload} />              
                </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect}/>

                </fieldset>
                <fieldset >
                    <button 
                      type='button'
                      onClick={handleImageModalClose}
                    >
                    Cancel
                  </button>
                  <button type='submit'>Save</button>
                </fieldset>

              </form>
            </div>
          </div>  
        </div>
      )}

    </div>
  )
}

