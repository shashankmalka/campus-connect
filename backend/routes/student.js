const express = require("express");
const Student = require("../models/Student");
const router = express.Router();
const cors = require("cors");

// Apply CORS middleware globally for this router
router.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true  // Allow cookies or other credentials if needed
}));

// OPTIONS route to handle preflight requests explicitly
router.options('/enroll', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Get student by roll number
router.get("/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Enroll new student (socialLinks are not included)
/*router.post("/enroll", async (req, res) => {
  try {
    const { name, rollNumber, email, dateOfBirth, contactNumber, address, profileImage } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email || !contactNumber || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new student instance (no socialLinks in the request)
    const newStudent = new Student({
      name,
      rollNumber,
      email,
      dateOfBirth,
      contactNumber,
      address,
      profileImage,
    });

    // Save the student to the database
    await newStudent.save();
    res.status(201).json({ message: "Student enrolled successfully", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enrolling student" });
  }
});*/




router.get('/:rollNumber/exam-results', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber }, 'examResults');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.examResults);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ message: "Error fetching exam results" });
  }
});
router.get('/:rollNumber/fee-details', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }


    res.json(student.feeDetails);
  } catch (error) {
    console.error('Error fetching fee details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get attendance for a specific student by roll number
router.get('/:rollNumber/attendance', async (req, res) => {
  const { rollNumber } = req.params;

  try {
    // Find the student by roll number
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the attendance data
    res.status(200).json({ attendance: student.attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Error fetching attendance data' });
  }
});
module.exports = router;
