const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Student = require('./models/Student'); // Adjust the path if necessary

dotenv.config(); // Load environment variables from .env file

const createTestUser = async () => {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Password to be hashed
    const password = 'test_password'; // The plain text password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new student user
    const newUser = new Student({
        name: 'Test Student',
        rollNumber: 'test_roll_number',
        password: hashedPassword,
        email: 'test@student.com',
        dateOfBirth: new Date('2000-01-01'),
        contactNumber: '1234567890',
        // You can add more fields as needed
    });

    try {
        // Save the new user to the database
        await newUser.save();
        console.log('Test user created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
    }
};

// Execute the function and handle any errors
createTestUser().catch(console.error);
