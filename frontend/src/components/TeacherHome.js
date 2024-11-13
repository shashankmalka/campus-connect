import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './TeacherHome.css'; // Import corresponding CSS

const TeacherHome = () => {
  return (
    <div className="teacher-home">
      <div className="header">
        <h1>Welcome to Teacher Home</h1>
        <Link to="/teacher-profile" className="profile-link">My Profile</Link>
      </div>
      <div className="sections-container">
        <Link to="/classes" className="section">
          <img src="images/cooo.png" alt="Classes Icon" className="section-icon" />
          <h2 className="section-title">Classes</h2>
        </Link>
        <Link to="/enroll-results" className="section">
          <img src="images/feed.png" alt="Enroll Results Icon" className="section-icon" />
          <h2 className="section-title">Enroll Results</h2>
        </Link>
        <Link to="/enroll-student" className="section">
          <img src="images/en.png" alt="Enroll Student Icon" className="section-icon" />
          <h2 className="section-title">Enroll Student</h2>
        </Link>
        <Link to="/mark-attendance" className="section">
          <img src="images/at.png" alt="Attendance Icon" className="section-icon" />
          <h2 className="section-title">Mark Attendance</h2>
        </Link>
        <Link to="/faculty-resources" className="section">
          <img src="images/re.png" alt="Faculty Resources Icon" className="section-icon" />
          <h2 className="section-title">Faculty Resources</h2>
        </Link>
        <Link to="/student-communication" className="section">
          <img src="images/com.png" alt="Student Communication Icon" className="section-icon" />
          <h2 className="section-title">Student Communication</h2>
        </Link>
        <Link to="/announcements" className="section">
          <img src="images/an.png" alt="Announcements Icon" className="section-icon" />
          <h2 className="section-title">Announcements</h2>
        </Link>
      </div>
      <footer>
        <p>© 2024 CampusConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TeacherHome;
