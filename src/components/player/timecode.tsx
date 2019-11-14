import * as React from 'react';

// Made this a component to isolate the functionality and prevent rerenders
const TimeCode = (props: {seconds: number}) => {
    const minutes = Math.floor(props.seconds / 60);
    const secondsRemainder = Math.floor(props.seconds % 60);
    const seconds = String(secondsRemainder).padStart(2, '0');

    return (
        <span>{minutes}:{seconds}</span>
    );
}

export default TimeCode;