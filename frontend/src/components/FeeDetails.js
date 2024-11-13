import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeeDetails.css'; // Import the CSS file

const FeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState(null);
  const rollNumber = localStorage.getItem('userRollNumber');  // Assuming roll number is stored in local storage after login

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const response = await axios.get(`/api/students/${rollNumber}/fee-details`);
        setFeeDetails(response.data);
      } catch (error) {
        console.error('Error fetching fee details:', error);
      }
    };

    fetchFeeDetails();
  }, [rollNumber]);

  return (
    <div className="fee-details-container">
      <h2>Fee Details</h2>
      {feeDetails ? (
        <table>
          <thead>
            <tr>
              <th>Amount Due</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{feeDetails.amountDue}</td>
              <td>{new Date(feeDetails.dueDate).toLocaleDateString()}</td>
              <td>{feeDetails.paid ? 'Paid' : 'Pending'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-fee-details">No fee details available</p>
      )}

      {/* Payment Link */}
      <div>
        <p>Click below to pay your fee.</p>
        <a href="https://www.kmit.in/" target="_blank" rel="noopener noreferrer">
          <button>Pay Fee</button>
        </a>
      </div>
    </div>
  );
};

export default FeeDetails;
