const data = [
    {    
        id: 1,
        title: "Farblehre",
        creator: "Nina Ansari",
        beginning: "14.04.2023",

        start: { type: String, required: true},
        end: { type: String, required: true},

        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident tempore amet quas ducimus consectetur tenetur distinctio hic facere laboriosam iure temporibus, quam necessitatibus placeat cum blanditiis numquam illum esse saepe eos! Deserunt similique maiores saepe eum eveniet illum numquam ipsam labore libero, temporibus mollitia adipisci reiciendis commodi animi, qui itaque."
    },
    {
        id: 2,
        title: "Design",
        creator: "Nina Ansari",
        beginning: "14.04.2023",
        start: { type: String, required: true},
        end: { type: String, required: true},
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem ipsam quod accusamus quasi praesentium deserunt magnam! Mollitia optio minus debitis accusantium dolorum culpa rerum, dignissimos minus, non consectetur, dolor saepe fugit quod qui molestias dolorem quos suscipit."
    },
    {
        id: 3,
        title: "Kolibries malen",
        creator: "Nina Ansari",
        beginning: "14.04.2023",
        start: { type: String, required: true},
        end: { type: String, required: true},
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem ipsam quod accusamus quasi praesentium deserunt magnam! Mollitia optio minus tenetur illum eaque! Totam autem iste ipsum debitis accusantium dolorum culpa rerum, dignissimos minus, non consectetur, dolor saepe fugit quod qui molestias dolorem quos suscipit."
    },
    {    
        id: 4,
        title: "Farblehre",
        creator: "Nina Ansari",
        beginning: "14.04.2023",

        start: { type: String, required: true},
        end: { type: String, required: true},

        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident tempore amet quas ducimus consectetur tenetur distinctio hic facere laboriosam iure temporibus, quam necessitatibus placeat cum blanditiis numquam illum esse saepe eos! Deserunt similique maiores saepe eum eveniet illum numquam ipsam labore libero, temporibus mollitia adipisci reiciendis commodi animi, qui itaque."
    },
    {
        id: 5,
        title: "Design",
        creator: "Nina Ansari",
        beginning: "14.04.2023",
        start: { type: String, required: true},
        end: { type: String, required: true},
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem ipsam quod accusamus quasi praesentium deserunt magnam! Mollitia optio minus debitis accusantium dolorum culpa rerum, dignissimos minus, non consectetur, dolor saepe fugit quod qui molestias dolorem quos suscipit."
    }
]

export default function CourseCards(){


    return data.map(course => {

        return(
            <div key={course.id} className="cardContainer">
                <img className='cardPicture' src="..." alt="" />
                <div className='cardBody'>
                    <h5 className='courseTitle'>
                        {course.title}
                    </h5>
                    <p className='courseDescription'>
                        {course.description}
                    </p>
                    <button className='AddToCartBtn'>
                        Add to Card
                    </button>
                </div>

            </div>
        )
    })

    


}