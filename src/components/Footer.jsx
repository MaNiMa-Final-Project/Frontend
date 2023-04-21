
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
      <p>AGB</p>
      <p>FAQ</p>
      <p>Nutzungsbedingungen</p>
      <p>Datenschutzerklärung</p>
      <p>Cookie-Richtlinie</p>
      <p>Impressum</p> 
      <p>© 2023 VG Bildkunst</p> 

      {<div class="social-container">
        <p>Follow us</p>
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
      </div>}
    </div>
  )
}