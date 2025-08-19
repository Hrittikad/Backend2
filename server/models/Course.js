import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
   enroller: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
     default: true
    }, // <-- added for availability
},{timestamps: true});


const Course = mongoose.model("Course", courseSchema);

export default Course;