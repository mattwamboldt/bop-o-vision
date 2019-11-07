import * as React from 'react';

interface IProps {
    onVisualizationChange: (id: string) => void;
}

const VisionList = (props: IProps) => {
    const visualizations = [
        {
            id: 'time',
            name: 'Time'
        },
        {
            id: 'frequency',
            name: 'Frequency'
        },
        {
            id: 'circle',
            name: 'Circle'
        }
    ];

    const [currentVisualization, setCurrentVisualization] = React.useState('time');

    return (
        <div id="visSelector">
            <h2>Visualization</h2>
            <ul>
                {visualizations.map((v, index) => {
                    let className = '';
                    if (v.id === currentVisualization) {
                        className = 'active';
                    }

                    return (
                        <li key={index}>
                            <a className={className}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentVisualization(v.id);
                                    props.onVisualizationChange(v.id);
                                }}>{index + 1} - {v.name}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default VisionList;