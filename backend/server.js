// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const studentRoutes = require('./routes/student');
const teacherRoutes = require("./routes/teachers");// Import student routes

const app = express();
require('dotenv').config(); // Load environment variables

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/campusconnect', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use auth routes and student routes
app.use('/api/auth', authRoutes);
app.use("/api/students", studentRoutes);


// Use routes
app.use("/api/teachers", teacherRoutes); 


app.use(cors());
app.use(
  cors({
    origin: 'https://campus-connect-rouge.vercel.app/',
  })
);


app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
