import React, { useState, useEffect } from "react";
import { faYoutube, faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer/footer.scss";

export default function Footer() {
    const [Logo, setLogo] = useState(null); // State to hold the logo image

    useEffect(() => {
        const importLogo = async () => {
            const logo = await import("../assets/images/sw_logos_small.png");
            setLogo(() => logo.default);
        };

        importLogo();
    }, []);

    return (
        <div className="footer">
            <div className="social-container">
                <a href="https://www.youtube.com/c/jamesqquick" target="_blank" className="youtube social">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/learnbuildteach/" target="_blank" className="facebook social">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/jamesqquick" target="_blank" className="twitter social">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/learnbuildteach" target="_blank" className="instagram social">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/company/studioartshuttle/?viewAsMember=true"
                    target="_blank"
                    className="linkedin social"
                >
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

            <p className="text-3xl font-bold mb-12">
                Trusted by <u className="">2,000+</u> users
            </p>

            <div className="containerlogo">
                {Logo && <img className="smallLogos" src={Logo} alt="Logos Auftraggeber" />}{" "}
                {/* Render the logo when it's loaded */}
            </div>
        </div>
    );
}
