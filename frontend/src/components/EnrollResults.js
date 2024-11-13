import React, { useState } from 'react';
import axios from 'axios';
import './EnrollResults.css';  

const EnrollResults = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [examName, setExamName] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', score: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', score: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultData = {
      rollNumber,
      examName,
      subjects: subjects.map((subj) => ({
        subject: subj.subject,
        score: Number(subj.score)
      }))
    };

 
    console.log("Data being sent to backend:", resultData);

    try {
      const response = await axios.post('/api/teachers/enroll-results', resultData);
      setSuccess('Result enrolled successfully!');
      setError('');
    } catch (err) {
      console.error("Error enrolling result:", err);
      setError('Failed to enroll result');
      setSuccess('');
    }
  };

  return (
    <div className="enroll-results-container">
      <h2>Enroll Student Results</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="enroll-results-form" onSubmit={handleSubmit}>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exam Name:</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>
        <h3>Subjects and Scores</h3>
        {subjects.map((subject, index) => (
          <div key={index}>
            <div className="subject-field">
              <label>Subject:</label>
              <input
                type="text"
                value={subject.subject}
                onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                required
              />
            </div>
            <div className="score-field">
              <label>Score:</label>
              <input
                type="number"
                value={subject.score}
                onChange={(e) => handleSubjectChange(index, 'score', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
          Add Another Subject
        </button>
        <button type="submit">Enroll Result</button>
      </form>
    </div>
  );
};

export default EnrollResults;
