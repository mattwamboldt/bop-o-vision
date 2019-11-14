import * as React from 'react';

import TimeCode from './timecode';

interface IProps {
    currentSeconds: number;
    totalSeconds: number;
    onSecondsChanged: (seconds: number) => void;

    isPlaying: boolean;
    onPlayPressed: (isPlaying: boolean) => void;

    volume: number;
    onVolumeChanged: (volume: number) => void;
};

const Controls = (props: IProps) => {
    let playButtonClass = "fa fa-play";
    if (props.isPlaying) {
        playButtonClass = "fa fa-pause";
    }

    return (
        <div id="controls">
            <button id="playButton" onClick={() => props.onPlayPressed(props.isPlaying)}>
                <i className={playButtonClass}></i>
            </button>
            <div id="timecode">
                <TimeCode seconds={props.currentSeconds} /> / <TimeCode seconds={props.totalSeconds} />
            </div>
            <input id="scrubber" type='range'
                min="0" max={props.totalSeconds}
                value={props.currentSeconds}
                onChange={(e) => props.onSecondsChanged(Number(e.target.value))} />
            <label><i className='fa fa-volume-up'></i></label>
            <input id="volume" type='range' min="0" max="100" value={props.volume * 100}
                onChange={(e) => props.onVolumeChanged(Number(e.target.value))} />
        </div>
    );
};

export default Controls;