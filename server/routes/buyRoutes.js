// routes/buyRoutes.js
import express from "express";
import { buyCourse } from "../controllers/buyController.js";

const router = express.Router();

// Route for buying a course
router.post("/buy", buyCourse);

export default router;
