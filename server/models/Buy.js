import mongoose from "mongoose";

const buySchema = new mongoose.Schema({
    user: {type: String, ref: "User", required: true},
    course: {type: String, ref: "Course", required: true},
    buyDate: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    status: {type: String, 
        enum: ["pending", "completed", "failed"], 
        default: "pending"},
    paymentMethod: {type: String, 
        enum: ["bkash", "credit_card"],
         required: true},
    isPaid: {type: Boolean, default: false}
},{timestamps: true});


const Buy = mongoose.model("Buy", buySchema);

export default Buy;