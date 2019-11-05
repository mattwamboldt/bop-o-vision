import * as React from 'react';

const Player = () => {
    return (
        <div id="player">
            <canvas id="visualizer" width="300px" height="300px"></canvas>
            <audio id="audio" controls>
                <source id="audioSource" src="audio/celebration.mp3" type="audio/mp3" />
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
};

export default Player;