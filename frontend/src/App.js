import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import Profile from "./components/Profile";
import EnrollStudent from "./components/EnrollStudent";
import TeacherProfile from './components/TeacherProfile';
import ResultsView from './components/ResultsView'; // Import the Results component
import EnrollResults from "./components/EnrollResults"; // Import EnrollResults
import FeeDetails from './components/FeeDetails';  // Import the new FeeDetails page
import StudentAttendance from "./components/StudentAttendance";
import TeacherMarkAttendance from "./components/TeacherMarkAttendance";
import StudentCommunication from './components/StudentCommunication';



function App() {
  const token = localStorage.getItem("token");
  const rollNumber = localStorage.getItem("userRollNumber");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Home routes */}
        <Route 
          path="/student-home" 
          element={token ? <StudentHome /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher-home" 
          element={token ? <TeacherHome /> : <Navigate to="/login" />} 
        />

        {/* Profile route */}
        <Route 
          path="/profile" 
          element={rollNumber ? <Profile /> : <Navigate to="/login" />} 
        />

        {/* Attendance related routes */}
       
        <Route path="/enroll-student" element={<EnrollStudent />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/results" element={<ResultsView />} />
        <Route path="/enroll-results" element={<EnrollResults />} /> {/* Route for EnrollResults */}
        <Route path="/fee-details" element={<FeeDetails />} />
        <Route path="/attendance" element={<StudentAttendance />} />
        <Route path="/mark-attendance" element={<TeacherMarkAttendance />} />
        <Route path="/student-communication" element={<StudentCommunication />} />

      </Routes>
    </Router>
  );
}

export default App;
