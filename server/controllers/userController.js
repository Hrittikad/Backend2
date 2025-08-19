//GET/api/user/

import User from "../models/User.js";

export const getUserData = (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCourse = req.user.recentSearchedCourse;
    res.json({ success: true, role, recentSearchedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Store User Recent Searched Course
export const storeRecentSearchedCourse = async (req, res) => {
  try {
    const { courseName } = req.body;   // ✅ renamed to avoid shadowing

    if (!courseName) {
      return res.status(400).json({ success: false, message: "Course name is required" });
    }

    // ✅ make sure we fetch the user from DB
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.recentSearchedCourse.length < 3) {
      user.recentSearchedCourse.push(courseName);
    } else {
      user.recentSearchedCourse.shift();
      user.recentSearchedCourse.push(courseName);
    }

    await user.save();

    res.json({
      success: true,
      message: "Course saved successfully.",
      recentSearchedCourse: user.recentSearchedCourse
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
