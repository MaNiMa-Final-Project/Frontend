// import { useState } from "react";
// import axios from "axios";



// export default function CreateCoursePage() {
//     const [title, setTitle] = useState("");
//     const [creator, setCreator] = useState("");
//     const [beginning, setBeginning] = useState("");
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [description, setDescription] = useState("");

//     const handleSubmit = event => {
//         event.preventDefault();

//         let start = new Date(`1995-12-17T${start}:00`).getTime();
//         let end = new Date(`1995-12-17T${end}:00`).getTime();

//         let duration = end - start

//         let newCourse = {
//             title: title,
//             creator: creator,
//             beginning: beginning,
//             start: start,
//             end: end,
//             duration: new Date(duration).getHours(),
//             description: description
//         }

//         try {

//             let response = await axios.post('BASE_URL_PROTECTED', newCourse, {
//                 withCredentials: true
//             })
//             setMessage('Kurs erfolgreich erstellt!')
//             console.log(response);

//         } catch (error) {
//             console.log(error)
//             setMessage('Kurserstellung nicht erfolgreich - Bitte Eingabe prüfen!')

//         }

//         setTitle("");
//         setCreator("");
//         setBeginning("");
//         setStart("");
//         setEnd("");
//         setDescription("");


//     };

//     return (
//         <div className="CreateCourse">
//             <h2>Kurs Erstellen</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Title</label>
//                 <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     placeholder="Title"
//                     onChange={event => setTitle(event.target.value)} />

//                 <label>Creator</label>
//                 <input
//                     type="text"
//                     id="creator"
//                     value={creator}
//                     placeholder="Creator"
//                     onChange={event => setCreator(event.target.value)} />

//                 <label>Beginning</label>
//                 <input
//                     type="text"
//                     id="beginning"
//                     value={beginning}
//                     placeholder="Beginning"
//                     onChange={event => setBeginning(event.target.value)} />

//                 <label>Start</label>
//                 <input
//                     type="text"
//                     id="start"
//                     value={start}
//                     placeholder="Start"
//                     onChange={event => setStart(event.target.value)} />

//                 <label>End</label>
//                 <input
//                     type="text"
//                     id="end"
//                     value={end}
//                     placeholder="End"
//                     onChange={event => setEnd(event.target.value)} />

//                 <label>Description</label>
//                 <textarea
//                     id="description"
//                     value={description}
//                     placeholder="Description"
//                     onChange={event => setDescription(event.target.value)} />

//                 <button type="submit">Create Course</button>
//             </form>
//         </div>
//     );
// }