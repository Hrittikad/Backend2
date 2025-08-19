import express from "express";
import { registerCourse, toggleAvailability } from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const courseRouter = express.Router();

// Register a new course
courseRouter.post("/register", protect, registerCourse);

// Toggle availability of a course (expects :courseId in params)
courseRouter.patch("/toggle-availability/:courseId", protect, toggleAvailability);

export default courseRouter;
