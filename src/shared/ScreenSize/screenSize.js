
export default function screenSize() {

    // const [screenSize, setScreenSize] = useState();
        
    // function handleResize() {
    //         setScreenSize({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         });
    //     }

    //     // Add a resize event listener to update the screen size when the window is resized.
    //     window.addEventListener("resize", handleResize);

    //     // Call the handler once on mount to capture the initial screen size.
    //     handleResize();

    //     // Remove the resize event listener when the component unmounts.
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };

    return {
                width: window.innerWidth,
                height: window.innerHeight
            };

}
