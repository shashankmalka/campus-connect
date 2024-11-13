import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const rollNumber = localStorage.getItem("userRollNumber");

    if (!rollNumber) {
      setError("No user logged in.");
      return;
    }

    axios
      .get(`/api/students/${rollNumber}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((err) => {
        setError("Error fetching profile data.");
        console.error(err);
      });
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-img">
          <img src={student.profileImage || "/default-profile.png"} alt="Profile" />
        </div>
        <div className="profile-info">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Contact Number:</strong> {student.contactNumber}</p>
          <p><strong>Address:</strong> {student.address ? `${student.address.street}, ${student.address.city}, ${student.address.state}, ${student.address.zipCode}` : 'N/A'}</p>
          <p><strong>Joined Date:</strong> {new Date(student.joinedDate).toLocaleDateString()}</p>

          {/* Social Links */}
          <div className="social-links">
            <p><strong>Social Links:</strong></p>
            {student.socialLinks?.linkedIn && (
              <p><a href={student.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            )}
            {student.socialLinks?.github && (
              <p><a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
            )}
            {student.socialLinks?.twitter && (
              <p><a href={student.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
