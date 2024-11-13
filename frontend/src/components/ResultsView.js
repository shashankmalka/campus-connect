import React, { useEffect, useState } from "react";
import axios from "axios";
import './ResultsView.css'; // Make sure this line imports the correct CSS

const ResultsView = () => {
  const [results, setResults] = useState([]);
  const rollNumber = localStorage.getItem("userRollNumber");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/students/${rollNumber}/exam-results`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [rollNumber]);

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      {Array.isArray(results) && results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="exam-table-container">
            <h3 className="exam-name">{result.examName}</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((subject, idx) => (
                  <tr key={idx}>
                    <td>{subject.subject}</td>
                    <td>{subject.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="no-results">
          <p>No results available</p>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
