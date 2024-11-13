const Student = require('../models/Student'); // Import the Student model

// Enroll a new student
exports.enrollStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      email,
      dateOfBirth,
      contactNumber,
      address,
      coursesEnrolled
    } = req.body;

    // Create a new student record
    const newStudent = new Student({
      name,
      rollNumber,
      email,
      dateOfBirth,
      contactNumber,
      address,
      coursesEnrolled,
    });

    // Save the student to the database
    await newStudent.save();

    // Send success response
    res.status(201).json({ message: "Student enrolled successfully", student: newStudent });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json({ message: "Failed to enroll student" });
  }
};
