// src/components/PlanningDetail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanningDetail = ({ planningId }) => {
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanningById = async () => {
      try {
        const response = await axios.get(`https://localhost:7125/api/Plannings/get-by-id/${planningId}`);
        setPlanning(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanningById();
  }, [planningId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {planning ? (
        <div>
          <h2>Planning Details</h2>
          <p>ID: {planning.id}</p>
          <p>Sport ID: {planning.sportId}</p>
          <p>Day: {planning.day}</p>
          <h3>Time Ranges</h3>
          <ul>
            {planning.timeRanges.map((range) => (
              <li key={range.id}>
                <p>{range.id}</p>
                {range.hourStart} - {range.hourEnd}
              </li>
            ))}
          </ul>
          <p>Date Created: {new Date(planning.dateCreation).toLocaleString()}</p>
        </div>
      ) : (
        <p>No planning found.</p>
      )}
    </div>
  );
};

export default PlanningDetail;
