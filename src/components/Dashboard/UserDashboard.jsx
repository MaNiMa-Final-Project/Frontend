import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./dashboard.scss";

export default function UserDashboard({ user }) {
  const [editingProfile, setEditingProfile] = useState(false);

  const handleProfileEdit = async (newData) => {
    try {
      const response = await axios.put(`${BASE_URL_PROTECTED}profile`, newData, {
        withCredentials: true
      });

      setUser(response.data);
      alert(`Dein Profil wurde erfolgreich aktualisiert!`);
      setEditingProfile(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="coursePreviewContainer">
      <section className="coursePreview section1">
        {/* Vorgemerkte Kurse anzeigen */}
        <h1>Vorgemerkte Kurse anzeigen</h1>
        {user.notedCourses && (
          <div className="innerCourseContainer">
            <ul>
              {user.notedCourses.map((course, index) => (
                <li key={uuidv4()}>
                  {index + 1}. {course.title}
                  <button>Add to Cart</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="coursePreview section2">
        {/* Evetuelle bevorstehende Kurse anzeigen */}

        <h1>Bevorstehende Kurse</h1>
        {user.upcomingCourses && (
          <div className="innerCourseContainer">
            <ul>
              {user.upcomingCourses.map((course, index) => (
                <li key={uuidv4()}>
                  {index + 1}. {course.title}
                  <button>Course Details</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="coursePreview section3">
        {/* Teilgenommene Kurse anzeigen */}

        <h1>Teilgenommene Kurse anzeigen</h1>
        {user.attendedCourses && (
          <div className="innerCourseContainer">
            <ul>
              {user.attendedCourses.map((course, index) => (
                <li key={uuidv4()}>
                  {index + 1}. {course.title}
                  <button>Comment the course</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <aside className="sidebar">
        {/* Profil bearbeiten Formular */}

        <>
          <form
            className="profileForm"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleProfileEdit({
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                avatar: formData.get("avatar")
              });
            }}
          >
            <label htmlFor="avatar">Avatar:</label>
            <input type="file" id="avatar" name="avatar" accept="image/*" />

            <label htmlFor="firstName">Vorname:</label>
            <input type="text" id="firstName" name="firstName" defaultValue={user.firstName} />

            <label htmlFor="lastName">Nachname:</label>
            <input type="text" id="lastName" name="lastName" defaultValue={user.lastName} />

            <hr />

            {/* Profil bearbeiten Button */}
            <button onClick={() => setEditingProfile(true)}>Profil bearbeiten</button>

            {editingProfile && (
              <>
                <button type="submit">Änderungen speichern</button>
                <button onClick={() => setEditingProfile(false)}>Abbrechen</button>
              </>
            )}
          </form>
        </>
      </aside>
    </div>
  );
}
