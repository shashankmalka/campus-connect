const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
require("dotenv").config();

const router = express.Router();


router.post("/login", async (req, res) => {
  const { userId, password, role } = req.body;


  if (!userId || !password || !role) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    let user;
    

    if (role === "student") {
      user = await Student.findOne({ rollNumber: userId });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ teacherId: userId });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }


    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    if (role === "student") {
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    if (role === "teacher") {
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }


    const payload = { id: user._id, role: role }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });


    res.json({ token, userId: userId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
