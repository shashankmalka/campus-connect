import React, { useState, useEffect } from "react";
import axios from "axios";
import './TeacherProfile.css';

const TeacherProfile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the teacherId and token from localStorage
  const teacherId = localStorage.getItem("teacherId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!teacherId || !token) {
      setError("Teacher not logged in.");
      setLoading(false);
      return;
    }

    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`/api/teachers/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token from localStorage
          },
        });

        setTeacherData(response.data); // Set teacher data
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId, token]); // Fetch data when teacherId or token changes

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Ensure necessary fields are initialized
  const name = teacherData.name || "N/A";
  const email = teacherData.email || "N/A";
  const teacherIdValue = teacherData.teacherId || "N/A";
  const department = teacherData.department || "N/A";
  const contact = teacherData.contact || "N/A";

  return (
    <div className="teacher-profile">
      <h1>{name}'s Profile</h1>
      <div className="profile-details">
        {teacherData.profileImage ? (
          <div className="profile-image">
            <img src={teacherData.profileImage} alt={`${name}'s profile`} />
          </div>
        ) : (
          <div className="profile-image-placeholder">No Image Available</div>
        )}

        <div className="profile-item">
          <label>Teacher ID:</label>
          <p>{teacherIdValue}</p>
        </div>
        <div className="profile-item">
          <label>Name:</label>
          <p>{name}</p>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <p>{email}</p>
        </div>
        <div className="profile-item">
          <label>Department:</label>
          <p>{department}</p>
        </div>
        <div className="profile-item">
          <label>Contact:</label>
          <p>{contact}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
