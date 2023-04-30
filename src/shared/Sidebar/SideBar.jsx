import { faCamera, faSquareCheck, faMarker, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import './sidebar.scss';
import ImageCrop from '../../shared/CropImage/ImageCrop'


export default function SideBar({user}){

  const [userData, setUserData] = useState(user);
  const [changeNickName, setChangeNickName] = useState(false);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const inputRef = useRef(null);

  function handleButtonClick() {
    inputRef.current.focus();
  }

  function handlePasswordClick() {
    setShowPasswordModal(true);
  }

  function handlePasswordModalClose() {
    setShowPasswordModal(false);
  }

  function handleImageClick() {
    setShowImageModal(true);
  }

  function handleImageModalClose() {
    setShowImageModal(false);
  }

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
                    defaultValue={user.nickName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{user.nickName}</p>
                )}
                {changeNickName ? (
                    <button 
                    type='button' 
                    onClick={()=>setChangeNickName(!changeNickName)}  
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeNickName(!changeNickName);
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
                    defaultValue={user.firstName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{user.firstName}</p>
                )}
                {changeFirstName ? (
                    <button 
                    type='button' 
                    onClick={()=>setChangeFirstName(!changeFirstName)}  
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeFirstName(!changeFirstName);
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
                    defaultValue={user.lastName} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{user.lastName}</p>
                )}
                {changeLastName ? (
                    <button 
                    type='button' 
                    onClick={()=>setChangeLastName(!changeLastName)}  
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeLastName(!changeLastName);
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
                    defaultValue={user.email} 
                    ref={inputRef}
                    />
                ) : (
                    <p>{user.email}</p>
                )}
                {changeEmail ? (
                    <button 
                    type='button' 
                    onClick={()=>setChangeEmail(!changeEmail)}  
                    >
                    <FontAwesomeIcon className='icons' icon={faSquareCheck} />
                    </button>
                ) : (
                    <button 
                    type='button'
                    onClick={() => {
                        setChangeEmail(!changeEmail);
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
            <form>
              <label htmlFor='oldPassword'>Old Password:</label>
              <input type='password' id='oldPassword' name='oldPassword' required />
              <label htmlFor='newPassword'>New Password:</label>
              <input type='password' id='newPassword' name='newPassword' required />
              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <input type='password' id='confirmPassword' name='confirmPassword' required />
            </form>
            <div className='modalButtons'>
              <button 
                type='button'
                onClick={handlePasswordModalClose}
              >
                Cancel
              </button>
              <button type='submit'>Save</button>
            </div>
          </div>  
        </div>
      )}

      {showImageModal && (
        <div className='modalOverlay'>
          <div className='modalContent'>
            <h2>Update Profile Picture</h2>
            {/* <form>
              <input type="file" accept="image/*" />
            </form> */}

            <ImageCrop ownImageWidth={'600'} existingImage={user.image}/>

            <div className='modalButtons'>
              <button 
                type='button'
                onClick={handleImageModalClose}
              >
                Cancel
              </button>
              <button type='submit'>Save</button>
            </div>
          </div>  
        </div>
      )}

    </div>
  )
}

