// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UpdatePlanning = () => {
//   const [planningId, setPlanningId] = useState('');
//   const [day, setDay] = useState(0);
//   const [timeRanges, setTimeRanges] = useState([
//     { id: '', hourStart: '', hourEnd: '' },
    
//   ]);
//   const [time, setTime] = useState([
//     {  hourStart: '', hourEnd: '' },
    
//   ]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch the planning data when the planningId changes
//   const fetchPlanningById = async () => {
//     if (!planningId) return; // Don't fetch if planningId is empty

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://localhost:7125/api/Plannings/get-by-id/${planningId}`);
//       const { day, timeRanges } = response.data;
//       setDay(day);
//       setTimeRanges(timeRanges);
//     } catch (error) {
//       setErrorMessage('Error fetching planning: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTimeRangeChange = (index, event) => {
//     const newTimeRanges = [...timeRanges];
//     newTimeRanges[index][event.target.name] = event.target.value;
//     setTimeRanges(newTimeRanges);
//   };

//   const handleAddTimeRange = () => {
//     setTime([...time, {  hourStart: '', hourEnd: '' }]);
//   };

//   const handleRemoveTimeRange = (index) => {
//     const newTimeRanges = timeRanges.filter((_, i) => i !== index);
//     setTimeRanges(newTimeRanges);
//   };

//   const handleUpdatePlanning = async (event) => {
//     event.preventDefault();

//     const planningData = {
//       id: planningId,
//       day: day,
//       timeRanges: time,
//     };

//     try {
//       await axios.put('https://localhost:7125/api/Plannings/update', planningData);
//       setSuccessMessage('Planning updated successfully!');
//       setErrorMessage('');
//     } catch (error) {
//       setErrorMessage('Error updating planning: ' + error.message);
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>*****Update Planning</h2>
//       <form onSubmit={handleUpdatePlanning}>
//         <div>
//           <label>
//             Planning ID:
//             <input
//               type="text"
//               value={planningId}
//               onChange={(e) => setPlanningId(e.target.value)}
//               required
//             />
//           </label>
//           <button 
//             type="button" 
//             onClick={fetchPlanningById} // Fetch planning data on button click
//           >
//             Fetch Planning Data
//           </button>
//         </div>
//         <div>
//           <label>
//             Day:
//             <input
//               type="text"
//               value={day}
           
//               onChange={(e) => setDay(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <h3>Time Ranges</h3>
//         {timeRanges.map((range, index) => (
//           <div key={index}>
//             <label>
//               Time Range ID:
//               <input
//                 type="text"
//                 name="id"
//                 value={range.id}
//                 onChange={(e) => handleTimeRangeChange(index, e)}
//                 required
//               />
//             </label>
//             <label>
//               Hour Start:
//               <input
//                 type="time"
//                 name="hourStart"
//                 value={range.hourStart}
//                 onChange={(e) => handleTimeRangeChange(index, e)}
//                 required
//               />
//             </label>
//             <label>
//               Hour End:
//               <input
//                 type="time"
//                 name="hourEnd"
//                 value={range.hourEnd}
//                 onChange={(e) => handleTimeRangeChange(index, e)}
//                 required
//               />
//             </label>
//             <button type="button" onClick={() => handleRemoveTimeRange(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddTimeRange}>
//           Add Time Range
//         </button>
//         <button type="submit">Update Planning</button>
//       </form>
//       {loading && <p>Loading current planning details...</p>}
//       {successMessage && <p>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default UpdatePlanning;

import React, { useState } from 'react';
import axios from 'axios';

const UpdatePlanning = () => {
  const [planningId, setPlanningId] = useState('');
  const [day, setDay] = useState('');
  const [timeRanges, setTimeRanges] = useState([
    { hourStart: '', hourEnd: '' },
  ]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPlanningById = async () => {
    if (!planningId) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7125/api/Plannings/get-by-id/${planningId}`);
      const { day, timeRanges } = response.data;
      console.log('response.data', response.data.timeRanges);
      
      setDay(day);
      setTimeRanges(timeRanges);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error fetching planning: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (index, event) => {
    const { name, value } = event.target;
    setTimeRanges(prev =>
      prev.map((range, i) => (i === index ? { ...range, [name]: value } : range))
    );
  };

  const handleAddTimeRange = () => {
    setTimeRanges([...timeRanges, { hourStart: '', hourEnd: '' }]);
  };

  const handleRemoveTimeRange = async (id,index) => {
    try{

        const response = await axios.delete(`https://localhost:7125/api/TimeRanges/delete/${id}`);
        console.log("id of time exact" ,id);
        console.log("index of time exact" ,index);
        console.log("res delete : ", response);
        
        setTimeRanges(timeRanges.filter((_, i) => i !== index));
    }catch(err){
        console.error("Error deleting test:", err);
        
    }
  };

  const handleUpdatePlanning = async (event) => {
    event.preventDefault();

    const planningData = {
      id: planningId,
      day: day,
      timeRanges,
    };

    try {
      await axios.put('https://localhost:7125/api/Plannings/update', planningData);
      setSuccessMessage('Planning updated successfully!');
      console.log("update .");
      
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
          <button type="button" onClick={fetchPlanningById}>
            Fetch Planning Data
          </button>
        </div>
        <div>
          <label>
            Day:
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </label>
        </div>
        <h3>Time Ranges</h3>
        {timeRanges.map((range, index) => (
          <div key={index}>
            {range.id}
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
            <button type="button" onClick={() => handleRemoveTimeRange(range.id , index)}>
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

