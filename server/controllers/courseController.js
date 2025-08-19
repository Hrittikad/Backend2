import Course from "../models/Course.js";
import User from "../models/User.js";

export const registerCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const enroller = req.user._id;

    // Check if Course Already Registered by this enroller
    const course = await Course.findOne({ enroller, title });
    if (course) {
      return res.json({ success: false, message: "Course Already Registered" });
    }

    await Course.create({ title, description, price, enroller });

    await User.findByIdAndUpdate(enroller, { role: "CourseInstructor" });

    res.json({ success: true, message: "Course Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Toggle availability
export const toggleAvailability = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    course.isAvailable = !course.isAvailable;
    await course.save();

    res.json({ success: true, message: "Course availability updated", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
