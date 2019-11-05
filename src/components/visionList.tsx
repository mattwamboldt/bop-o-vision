import * as React from 'react';

const VisionList = () => {
    return (
        <div id="visSelector">
            <label htmlFor="visualization">Visualization</label>
            <select id="visualization">
                <option value="time">Time</option>
                <option value="frequency">Frequency</option>
                <option value="circle">Circle</option>
            </select>
        </div>
    );
};

export default VisionList;