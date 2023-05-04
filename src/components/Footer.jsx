
import React from "react";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Footer() {

  return (
    <div className="footer">
     

      <div className="social-container">
        <a href="https://www.youtube.com/c/jamesqquick" target="_blank"
          className="youtube social">
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.facebook.com/learnbuildteach/" target="_blank"
          className="facebook social">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com/jamesqquick" target="_blank" className="twitter social">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com/learnbuildteach" target="_blank"
          className="instagram social">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href ="https://www.linkedin.com/company/studioartshuttle/?viewAsMember=true" target="_blank"
          className="linkedin social">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
      <div className="shortcuts">
        <p>AGB</p>
        <p>FAQ</p>
        <p>Nutzungsbedingungen</p>
        <p>Datenschutzerklärung</p>
        <p>Widerrufsbelehrung</p>
        <p>Impressum</p> 
        <p>© 2023 VG Bildkunst</p> 
      </div>

<h2 className="text-3xl font-bold mb-12">Trusted by <u class="">2,000+</u> users</h2>

<div className="containerlogo">
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
  <div className="c">
    <img
      src="../src/assets/images/sw_logo_kunst_und_helden.jpg"
      className="img-fluid grayscale px-3 md:px-2"
      alt="Logo Kunst und Helden"
    />
  </div>

  <div className="mb-12 lg:mb-0">
    <img
      src="../src/assets/images/sw_logo_fd.png"
      className="img-fluid grayscale px-6 md:px-12"
      alt="Logo Finc Dynamics"
    />
  </div>

  <div className="mb-12 lg:mb-0">
    <img
      src="../src/assets/images/sw_logo_Commerzbank.jpg"
      className="img-fluid grayscale px-6 md:px-12"
      alt="Logo Commerzbank"
    />
  </div>

  <div className="mb-12 lg:mb-0">
    <img
      src="../src/assets/images/sw_logo_Staatliche_Museen.png"
      className="img-fluid grayscale px-6 md:px-12"
      alt="Logo Staatliche Museen zu Berlin"
    />
  </div>
  <div className="mb-12 lg:mb-0">
    <img
      src="../src/assets/images/sw_logo_solidrock.png"
      className="img-fluid grayscale px-6 md:px-12"
      alt="Logo SolidrockIT"
    />
  </div>
  </div>
    </div>
    </div>
    
  )
}