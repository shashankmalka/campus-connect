import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

const Login = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [userId, setUserId] = useState(""); // Roll number or teacher ID
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsTeacher(!isTeacher); // Toggle between teacher and student login
    setError(null); // Clear any existing error message on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine the role based on toggle
      const role = isTeacher ? "teacher" : "student";

      // Make the request to the backend
      const response = await axios.post("/api/auth/login", {
        userId,
        password,
        role, // Send login credentials with role
      });

      // Handle successful login
      const { token } = response.data; // Assuming token is returned from the server
      localStorage.setItem("token", token); // Store token for later use

      if (role === "teacher") {
        // Store teacherId in localStorage
        localStorage.setItem("teacherId", userId); // Store teacherId for teacher login

        // Fetch teacher profile after login
        const teacherResponse = await axios.get(`/api/teachers/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in request header
          },
        });

        // Store teacher data in localStorage (optional, for later use)
        localStorage.setItem("teacherProfile", JSON.stringify(teacherResponse.data));

        // Navigate to teacher home or profile page
        navigate("/teacher-home");
      } else {
        // For student login, store roll number
        localStorage.setItem("userRollNumber", userId); // Store roll number for student login
        navigate("/student-home");
      }

    } catch (error) {
      if (error.response) {
        // If the error is from the server, display the message
        setError(error.response.data.message || "Login failed");
      } else {
        // If the request fails before getting a response
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
<div className="login-page-wrapper">
  <form className="login-form-container" onSubmit={handleSubmit}>
    <div className="login-title-container">
      <p className="login-title">
        {isTeacher ? "Teacher Login" : "Student Login"}
      </p>
      <span className="login-subtitle">
        Connect and collaborate for a better learning experience.
      </span>
    </div>

    {error && <p className="error-message">{error}</p>}

    <div className="input-field-container">
      <label className="input-label" htmlFor="id_field">
        {isTeacher ? "Teacher ID" : "Roll Number"}
      </label>
      <input
        type="text"
        placeholder={isTeacher ? "Teacher ID" : "Roll Number"}
        className="input-field"
        id="id_field"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
    </div>

    <div className="input-field-container">
      <label className="input-label" htmlFor="password_field">
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        id="password_field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <div className="forgot-password-container">
      <a className="forgot-password-link" href="/">
        Forgot password?
      </a>
    </div>

    <button className="submit-btn" type="submit">
      {isTeacher ? "Teacher Login" : "Student Login"}
    </button>

    <div className="role-toggle-container">
      <p className="role-text">
        {isTeacher ? "Login as a Student?" : "Login as a Teacher?"}
        <span onClick={toggleLogin} className="toggle-link">
          {isTeacher ? "Student" : "Teacher"}
        </span>
      </p>
    </div>
  </form>
</div>

  );
};

export default Login;
