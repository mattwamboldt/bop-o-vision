import * as React from 'react';

import Display from './display';
import Controls from './controls';

interface IState {
    currentSeconds: number;
    totalSeconds: number;
    isPlaying: boolean;
    volume: number;
};

class Player extends React.Component<{}, IState> {
    private audioPlayerRef: HTMLAudioElement = null;

    constructor (props: {}) {
        super(props);
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
                <Display />
                <Controls currentSeconds={this.state.currentSeconds}
                    totalSeconds={this.state.totalSeconds}
                    onSecondsChanged={this.onSecondsChanged}
                    isPlaying={this.state.isPlaying}
                    onPlayPressed={this.onPlayPressed}
                    volume={this.state.volume}
                    onVolumeChanged={this.onVolumeChanged} />
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

    private onPlayPressed = (isPlaying: boolean) => {
        if (isPlaying) {
            this.audioPlayerRef.pause();
        } else {
            this.audioPlayerRef.play();
        }
    }

    private onSecondsChanged = (seconds: number) => {
        this.audioPlayerRef.currentTime = seconds;
    }

    private onVolumeChanged = (volume: number) => {
        this.audioPlayerRef.volume = volume / 100;
    }
};

export default Player;