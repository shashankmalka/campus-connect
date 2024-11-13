const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST request to enroll a student
router.post('/enroll', studentController.enrollStudent);

module.exports = router;
