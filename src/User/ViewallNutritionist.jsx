import React, { useEffect, useState } from 'react';
import './NutritionistTable.css';

const NutritionistTable = () => {
  const [nutritionists, setNutritionists] = useState([]);

  // Fetch nutritionists from the backend
  useEffect(() => {
    fetch('http://localhost:2025/user/viewnutritionists')
      .then((response) => response.json())
      .then((data) => setNutritionists(data))
      .catch((error) => console.error('Error fetching nutritionists:', error));
  }, []);

  return (
    <div className="nutritionists-container">
      <h1>Nutritionists Management</h1>
      <input
        type="text"
        placeholder="Search nutritionists..."
        className="search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>PROFILE</th>
            <th>EMAIL</th>
            <th>SPECIALIZATIONS</th>
            <th>EXPERIENCE</th>
            <th>FEE</th>
            <th>LOCATION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {nutritionists.map((nutritionist) => (
            <tr key={nutritionist.id}>
              <td>
                <div className="profile-cell">
                  <img
                    src={nutritionist.profileImage || '/default-profile.png'}
                    alt="Profile"
                    className="profile-image"
                  />
                  <span>{nutritionist.name}</span>
                </div>
              </td>
              <td>{nutritionist.email}</td>
              <td>
                {nutritionist.specializations.map((spec, index) => (
                  <span key={index} className="specialization">
                    {spec}
                  </span>
                ))}
              </td>
              <td>{nutritionist.yearsOfExperience}</td>
              <td>${nutritionist.consultationFee}</td>
              <td>{nutritionist.clinicAddress}</td>
              <td>
                <button className="view-button">👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionistTable;
