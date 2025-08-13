import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected"));
        console.log("Connecting to:", `${process.env.MONGODB_URI}/BACKEND`); // Debug line
        await mongoose.connect(`${process.env.MONGODB_URI}/BACKEND`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;