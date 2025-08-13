import express from "express";  
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = express.Router();

const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

        // Defensive checks
        if (!data || !data.id || !data.email_addresses || !data.email_addresses[0]) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + "" + data.last_name,
            image: data.image_url,
        };

        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }

            case "user.updated":{
                await User.findOneAndUpdate({ _id: data.id }, userData);
                break;
            }

            case "user.deleted":{
                await User.findOneAndDelete({ _id: data.id });
                break;
            }

            default:
                break;
        }

        res.status(200).json({ success: true, message: "Webhook processed successfully" });
 
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: "Webhook processing failed" });
    }
};

export default clerkWebhooks;