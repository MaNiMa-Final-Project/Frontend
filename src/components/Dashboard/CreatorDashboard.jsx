import { useEffect, useState } from "react";
import SideBar from "../../shared/Sidebar/SideBar";

import "./dashboard.scss";

export default function CreatorDashboard({ user }) {
    return (
        <div className="creatorDashboardContainer">
            <div className="section1">
                <h1>section1</h1>
            </div>
            <div className="section2">
                <h1>section2</h1>
            </div>

            <SideBar user={user} />
        </div>
    );
}
