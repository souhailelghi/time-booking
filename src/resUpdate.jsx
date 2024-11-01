import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdatePlanning = () => {
  const [planningId, setPlanningId] = useState('');
  const [day, setDay] = useState(0);
  const [timeRanges, setTimeRanges] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch the planning data when the planningId changes
  const fetchPlanningById = async () => {
    if (!planningId) return; // Don't fetch if planningId is empty

    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7125/api/Plannings/get-by-id/${planningId}`);
      const { day, timeRanges } = response.data;
      setDay(day);
      setTimeRanges(timeRanges);
    } catch (error) {
      setErrorMessage('Error fetching planning: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (index, event) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges[index][event.target.name] = event.target.value;
    setTimeRanges(newTimeRanges);
  };

  const handleAddTimeRange = () => {
    setTimeRanges([...timeRanges, { id: '', hourStart: '', hourEnd: '' }]); // Placeholder for ID
  };

  const handleRemoveTimeRange = (index) => {
    const newTimeRanges = timeRanges.filter((_, i) => i !== index);
    setTimeRanges(newTimeRanges);
  };

  const handleUpdatePlanning = async (event) => {
    event.preventDefault();

    // Prepare data without IDs
    const planningData = {
      id: planningId,
      day: day,
      timeRanges: timeRanges.map(({ hourStart, hourEnd }) => ({ hourStart, hourEnd })),
    };

    try {
      await axios.put('https://localhost:7125/api/Plannings/update', planningData);
      setSuccessMessage('Planning updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating planning: ' + error.message); 
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Update Planning</h2>
      <form onSubmit={handleUpdatePlanning}>
        <div>
          <label>
            Planning ID:
            <input
              type="text"
              value={planningId}
              onChange={(e) => setPlanningId(e.target.value)}
              required
            />
          </label>
          <button 
            type="button" 
            onClick={fetchPlanningById} // Fetch planning data on button click
          >
            Fetch Planning Data
          </button>
        </div>
        <div>
          <label>
            Day:
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </label>
        </div>
        <h3>Time Ranges</h3>
        {timeRanges.map((range, index) => (
          <div key={index}>
            {/* Hide Time Range ID input */}
            <input type="hidden" name="id" value={range.id} />
            <label>
              Hour Start:
              <input
                type="time"
                name="hourStart"
                value={range.hourStart}
                onChange={(e) => handleTimeRangeChange(index, e)}
                required
              />
            </label>
            <label>
              Hour End:
              <input
                type="time"
                name="hourEnd"
                value={range.hourEnd}
                onChange={(e) => handleTimeRangeChange(index, e)}
                required
              />
            </label>
            <button type="button" onClick={() => handleRemoveTimeRange(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTimeRange}>
          Add Time Range
        </button>
        <button type="submit">Update Planning</button>
      </form>
      {loading && <p>Loading current planning details...</p>}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdatePlanning;
