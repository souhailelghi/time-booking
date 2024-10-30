import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanningsList = ({ sportId }) => {
    const [plannings, setPlannings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlannings = async () => {
            try {
                const response = await axios.get(`https://localhost:7125/api/Plannings/get-by-sport/${sportId}`);
                setPlannings(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlannings();
    }, [sportId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Plannings for Sport ID: {sportId}</h2>
            {plannings.length === 0 ? (
                <p>No plannings found.</p>
            ) : (
                <ul>
                    {plannings.map(planning => (
                        <li key={planning.id}>
                            <strong>Day:</strong> {planning.day}<br />
                            <strong>Date Created:</strong> {new Date(planning.dateCreation).toLocaleString()}<br />
                            <strong>Time Ranges:</strong>
                            <ul>
                                {planning.timeRanges.length === 0 ? (
                                    <li>No time ranges available.</li>
                                ) : (
                                    planning.timeRanges.map(range => (
                                        <li key={range.id}>
                                            {range.hourStart} - {range.hourEnd}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlanningsList;
