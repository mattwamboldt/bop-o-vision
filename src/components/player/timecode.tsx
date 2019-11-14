import * as React from 'react';

const TimeCode = (props: {seconds: number}) => {
    const minutes = Math.floor(props.seconds / 60);
    const secondsRemainder = Math.floor(props.seconds % 60);
    const seconds = String(secondsRemainder).padStart(2, '0');

    return (
        <span>{minutes}:{seconds}</span>
    );
}

export default TimeCode;