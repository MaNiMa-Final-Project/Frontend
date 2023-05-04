import axios from "axios";
import { BASE_URL_PUBLIC } from "../../service/config";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLegitUser } from "../../hooks/useLegitUser";
import { useEffect, useState } from "react";

export default function MarkAsFavorite({ evt, courseId }) {
  const userData = useLegitUser();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let resp = userData.isCourseFavorite(courseId);
    if (resp) setIsFavorite(resp);
  }, [userData]);

  const handleFavoriteChange = (event) => {
    event.stopPropagation();

    if (event.target.checked) {
      console.log("add " + courseId);
      setIsFavorite(!isFavorite);
    } else {
      console.log("delete " + courseId);
      setIsFavorite(false);
    }
  };

  const checkboxStyle = {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
    height: 0,
    width: 0
  };

  const labelStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
    width: "1.5em",
    height: "1.5em",
    lineHeight: "2em",
    margin: "0 5px",
    color: "gray"
  };

  return (
    <label style={labelStyle}>
      <input type="checkbox" checked={isFavorite} onChange={handleFavoriteChange} style={checkboxStyle} />
      {isFavorite ? (
        <span style={{ textShadow: "0 0 5px white", color: "rgb(237, 237, 43)" }}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      ) : (
        <span style={{ textShadow: "0 0 5px white" }}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      )}
    </label>
  );
}
