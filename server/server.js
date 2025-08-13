
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import { connect } from "mongoose";

connectDB();

const app = express();
app.use(cors())//Enable Cross-Origin Resource Sharing


//middleware
app.use(express.json())//Parse JSON bodies
app.use(clerkMiddleware())

//API to listen to Clerk webhooks
app.use("/api/clerk", clerkWebhooks);


app.get('/', (req, res) => res.send("API is working FINE."));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
