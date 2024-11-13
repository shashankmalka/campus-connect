import React, { useState } from 'react';
import axios from 'axios';
import styles from './EnrollStudentStyles.module.css';

const EnrollStudent = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    coursesEnrolled: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const [field, subField] = name.split('.');
      setStudentData((prevData) => ({
        ...prevData,
        [field]: { ...prevData[field], [subField]: value },
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/teachers/enroll-student', studentData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error enrolling student:', error);
      setMessage('Failed to enroll student.');
    }
  };

  return (
    <div className={styles['enroll-student-container']}>
      <h2 className={styles['enroll-student-title']}>Enroll New Student</h2>
      <form onSubmit={handleSubmit} className={styles['enroll-student-form']}>
        <div>
          <label className={styles['enroll-student-form-label']}>Name:</label>
          <input type="text" name="name" value={studentData.name} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Roll Number:</label>
          <input type="text" name="rollNumber" value={studentData.rollNumber} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Email:</label>
          <input type="email" name="email" value={studentData.email} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={studentData.dateOfBirth} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Contact Number:</label>
          <input type="text" name="contactNumber" value={studentData.contactNumber} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Street:</label>
          <input type="text" name="address.street" value={studentData.address.street} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>City:</label>
          <input type="text" name="address.city" value={studentData.address.city} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>State:</label>
          <input type="text" name="address.state" value={studentData.address.state} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Zip Code:</label>
          <input type="text" name="address.zip" value={studentData.address.zip} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Course Enrolled:</label>
          <select name="coursesEnrolled" value={studentData.coursesEnrolled} onChange={handleChange} className={styles['enroll-student-dropdown']}>
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="AI & ML">AI & ML</option>
            <option value="Data Science">Data Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>
        </div>
        <div>
          <label className={styles['enroll-student-form-label']}>Password:</label>
          <input type="password" name="password" value={studentData.password} onChange={handleChange} required className={styles['enroll-student-input']} />
        </div>
        <button type="submit" className={styles['enroll-student-button']}>Enroll Student</button>
      </form>
      {message && (
        <p className={`${styles['enroll-student-message']} ${message.includes('Failed') ? styles['enroll-student-message--error'] : styles['enroll-student-message--success']}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EnrollStudent;
