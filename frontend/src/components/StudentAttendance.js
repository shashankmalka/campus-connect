import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './StudentAttendance.module.css'; // Import CSS module

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');
  const rollNumber = localStorage.getItem("userRollNumber");  // Get roll number from localStorage

  // Fetch attendance data on component mount
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!rollNumber) {
        setError('Roll number not found in localStorage');
        return;
      }

      try {
        // Make API call to fetch attendance data
        const response = await axios.get(`/api/students/${rollNumber}/attendance`);
        setAttendance(response.data.attendance);
      } catch (error) {
        setError('Failed to fetch attendance data.');
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [rollNumber]); // The roll number will be used as the dependency

  // Calculate the average attendance
  const calculateAverageAttendance = () => {
    if (attendance.length === 0) return 0;

    const totalAttendance = attendance.reduce((sum, record) => sum + record.attendancePercentage, 0);
    return (totalAttendance / attendance.length).toFixed(2); // Returns the average rounded to two decimal places
  };

  return (
    <div className={styles.attendanceContainer}>
      <h2>Your Attendance</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}

      {attendance.length === 0 ? (
        <div className={styles.noAttendance}>
          <p>No attendance records available</p>
        </div>
      ) : (
        <>
          {/* Display the average attendance */}
          <div className={styles.averageAttendance}>
            <p><strong>Average Attendance: </strong>{calculateAverageAttendance()}%</p>
          </div>

          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td>{record.subject}</td>
                  <td>{record.attendancePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentAttendance;
