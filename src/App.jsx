import './App.css';
// import PlanningsList from './PlanningsList';
// import PlanningDetail from './PlanningDetail';
import UpdatePlanning from './UpdatePlanning';
import React, { useState } from 'react';

function App() {
  const [sportId, setSportId] = useState(""); // Initialize with empty string
  const [planningId, setPlanningId] = useState(""); // Initialize with empty string

  return (
    <>
      <div>
        {/* <h1>Sports Planning Application</h1>
        <div>
          <label>
            Sport ID:
            <input
              type="text"
              value={sportId}
              onChange={(e) => setSportId(e.target.value)}
              required
            />
          </label>
        </div>
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
        </div> */}

        {/* Pass the sportId prop to PlanningsList */}
        {/* <PlanningsList sportId={sportId} /> */}

        {/* <h1>Planning Management</h1> */}
        {/* Pass the planningId prop to PlanningDetail */}
        {/* <PlanningDetail planningId={planningId} /> */}

        <h1>Update Planning Management</h1>
        {/* Pass the planningId prop to UpdatePlanning */}
        <UpdatePlanning planningId={planningId} />
      </div>
    </>
  );
}

export default App;
