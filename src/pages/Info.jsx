import React from "react";
import Kontaktformular from "../components/Kontaktformular";

export default function Info() {
    return (
        <div className="info" style={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
            <h1 style={{ fontSize: "2rem", color: "white", marginTop: "0rem" }}>
                ArtShuttle ist ein Berliner Design Studio. Leidenschaftlich rational – und mit Blick für das Wesentliche
                entwickele ich gestalterische Lösungen für alle Bereiche der Visuellen Kommunikation. Umsicht in der
                Recherche, Durchblick in der Analyse sowie Weitblick in Strategie und Konzept sind für uns elementar.
                ArtShuttle geht den Dingen auf den Grund, über Grenzen hinweg und immer auf ein Ziel zu: Neues, das Sinn
                macht. Wir leben den Dialog – im Team und mit Auftraggebern.{" "}
            </h1>
            <div className="kontaktadresse">
                <p>Studio ArtShuttle</p>
                <p>Breitestrasse 20</p>
                <p>10317 Berlin</p>
                <p>Tel. : +49 (0)178 / 995 423 45</p>
                <p>
                    <u>contact@artshuttle.com</u>
                </p>
            </div>
            <div className="kontakt">
                <Kontaktformular />
            </div>
        </div>
    );
}
