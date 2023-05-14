import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { BASE_URL_PUBLIC } from "../service/config";

import BeatSpinner from "../shared/Spinners/BeatLoader";
import MarkAsFavorite from "../components/HomePage/MarkAsFavorite";

export default function CreatorPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(BASE_URL_PUBLIC + `/creator/${id}`);
                if (response.status === 200) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="CreatorPage" >
            {isLoading ? (
                <BeatSpinner isLoading={isLoading} />
            ) : (
                <>
                    <div className="innerContainer">
                        <div className="imageContainer">
                            <img src={data.creatorData.croppedImage} alt="" />
                        </div>

                        <p className="textContainer">
                            <div className="test" dangerouslySetInnerHTML={{ __html: data.creatorData.profileText }}></div>
                        </p>
                    </div>
                    <div className="outerCourseContainer">
                        {data.courses.map((course) => {
                            return (
                                <div key={course._id} className="creatorCourseContainer">
                                    <div className="titleFavorite">
                                        <h1 className="courseTitle">{course.title}</h1>
                                        <MarkAsFavorite />
                                    </div>
                                    <button type="button" className="meetingBookBtn" >Erstgespräch buchen</button>
                                    <div className="courseInfo">
                                        <p>Creator: {course.creator}</p>
                                        <p>Start: {course.start}</p>
                                        <p>End: {course.end}</p>
                                        <label htmlFor="image">Course Image:</label>
                                        <img src={course.image} alt="" />
                                        <p className="courseDescription">Description: {course.description}</p>
                                        <span>More information coming soon...</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
