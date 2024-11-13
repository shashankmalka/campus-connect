import React, { useState } from 'react';
import axios from 'axios';
import styles from './TeacherMarkAttendanceStyles.module.css'; // Import styles correctly

const TeacherMarkAttendance = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', attendancePercentage: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', attendancePercentage: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate attendance percentages
    for (let subj of subjects) {
      if (
        subj.attendancePercentage === '' ||
        subj.attendancePercentage < 0 ||
        subj.attendancePercentage > 100
      ) {
        setError('Attendance percentage must be between 0 and 100.');
        setSuccess('');
        return;
      }
    }

    const attendanceData = {
      rollNumber,
      subjects: subjects.map((subj) => ({
        subject: subj.subject,
        attendancePercentage: Number(subj.attendancePercentage),
      })),
    };

    console.log("Data being sent to backend:", attendanceData); // Debugging line

    try {
      const response = await axios.post('/api/teachers/mark-attendance', attendanceData);
      setSuccess('Attendance marked successfully!');
      setError('');
      // Optionally, reset the form
      setRollNumber('');
      setSubjects([{ subject: '', attendancePercentage: '' }]);
    } catch (err) {
      console.error("Error marking attendance:", err);
      setError(err.response?.data?.message || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  return (
    <div className={styles['mark-attendance-container']}>
      <h2>Mark Attendance</h2>
      {error && <div className={styles['error-message']}>{error}</div>}
      {success && <div className={styles['success-message']}>{success}</div>}
      <form className={styles['mark-attendance-form']} onSubmit={handleSubmit}>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <h3>Subjects and Attendance</h3>
        {subjects.map((subject, index) => (
          <div key={index} className={styles['subject-attendance-group']}>
            <div className={styles['subject-field']}>
              <label>Subject:</label>
              <input
                type="text"
                value={subject.subject}
                onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                required
              />
            </div>
            <div className={styles['attendance-field']}>
              <label>Attendance Percentage:</label>
              <input
                type="number"
                value={subject.attendancePercentage}
                onChange={(e) => handleSubjectChange(index, 'attendancePercentage', e.target.value)}
                required
                min="0"
                max="100"
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
          Add Another Subject
        </button>
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default TeacherMarkAttendance;
