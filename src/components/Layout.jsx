import Header from "./Header";
import Footer from "./Footer";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Layout = ({ children }) => {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);

        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <Header />
            <div className="layout">{children}</div>

            {!isLoading && (
                <Particles id="tsparticles" url="particles.json" init={particlesInit} loaded={particlesLoaded} />
            )}

            <Footer />
        </>
    );
};

export default Layout;
