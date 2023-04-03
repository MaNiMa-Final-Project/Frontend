
/* 
const courseSchema = mongoose.Schema({

    title: {type: String, required: true, unique: true},
    creator: {type: mongoose.Types.ObjectId, ref: 'User'},
    beginning: { type: Date, required: true},
    duration: { type: Number, required: true},
    start: { type: String, required: true},
    end: { type: String, required: true},
    description: {type: String, required: true},
    comments: {type: String, required: true},
    participants: [{type: mongoose.Types.ObjectId, ref: 'User'}]

},{ timestamps: true });
*/




const data = [
    {    
        title: "Farblehre",
        creator: "Nina Ansari",
        beginning: "14.04.2023",

        start: { type: String, required: true},
        end: { type: String, required: true},

        description: "blabla"
    },
    {
        title: "Design",
        creator: "Nina Ansari",
        beginning: "14.04.2023",
        start: { type: String, required: true},
        end: { type: String, required: true},
        description: "awefewa"
    },
    {
        title: "Kolibries malen",
        creator: "Nina Ansari",
        beginning: "14.04.2023",
        start: { type: String, required: true},
        end: { type: String, required: true},
        description: "fwefaew"
    }
]

    






export default function ShoppingCart(){



    return(

        
        <h1>ShoppingCart</h1>
    )
}