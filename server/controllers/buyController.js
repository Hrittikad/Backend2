import Buy from "../models/Buy.js";   
import Course from "../models/Course.js"; 

// Buy a course
export const buyCourse = async (req, res) => {
  try {
    const { userId, courseId, paymentMethod } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Check if course is available (optional)
    if (!course.isAvailable) {
      return res.status(400).json({ success: false, message: "Course is not available for enrollment" });
    }

    // Create new Buy record
    const newBuy = new Buy({
      user: userId,
      course: courseId,
      buyDate: new Date(),
      totalPrice: course.price,
      paymentMethod,
      status: "pending",
      isPaid: false
    });

    await newBuy.save();

    res.json({ success: true, message: "Course purchased successfully", buy: newBuy });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
