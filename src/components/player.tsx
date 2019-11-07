import * as React from 'react';

interface IState {
    currentSeconds: number;
    totalSeconds: number;
    isPlaying: boolean;
    volume: number;
};

class Player extends React.Component<{}, IState> {
    private audioPlayerRef: HTMLAudioElement;

    constructor (props: {}) {
        super(props);
        this.audioPlayerRef = null;
        this.state = {
            currentSeconds: 0,
            totalSeconds: 0,
            isPlaying: false,
            volume: 100
        };
    }

    public render() {
        return (
            <div id="player">
                <canvas id="visualizer" width="300px" height="300px"></canvas>
                <div id="controls">
                    <button id="playButton" onClick={() => {
                        if (this.state.isPlaying) {
                            this.audioPlayerRef.pause();
                        } else {
                            this.audioPlayerRef.play();
                        }
                    }}>
                        {this.state.isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <div id="timecode">
                        {this.formatTimecode(this.state.currentSeconds)} / {this.formatTimecode(this.state.totalSeconds)}
                    </div>
                    <input id="scrubber" type='range'
                        min="0" max={this.state.totalSeconds}
                        value={this.state.currentSeconds}
                        onChange={(e) => {
                            this.audioPlayerRef.currentTime = Number(e.target.value);
                        }}/>
                    <label>Volume</label>
                    <input id="volume" type='range' min="0" max="100" value={this.state.volume * 100} onChange={(e) => {
                        this.audioPlayerRef.volume = Number(e.target.value) / 100;
                    }}/>
                </div>
                <audio id="audio" ref={(r) => { this.audioPlayerRef = r; }}
                    onTimeUpdate={(e) => {
                        this.setState({currentSeconds: e.currentTarget.currentTime});
                    }}
                    onDurationChange={(e) => {
                        this.setState({totalSeconds: e.currentTarget.duration});
                    }}
                    onPlay={() => {
                        this.setState({isPlaying: true});
                    }}
                    onPause={() => {
                        this.setState({isPlaying: false});
                    }}
                    onVolumeChange={(e) => {
                        this.setState({volume: e.currentTarget.volume});
                    }}>
                    <source id="audioSource" src="audio/celebration.mp3" type="audio/mp3" />
                    Your browser does not support the audio tag.
                </audio>
            </div>
        );
    }

    private formatTimecode (seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.floor(seconds % 60);
        return minutes + ':' + String(secondsRemainder).padStart(2, '0');
    }
};

export default Player;