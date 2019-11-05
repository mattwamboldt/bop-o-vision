import * as React from "react";

import Player from './player';
import TrackList from './trackList';
import VisionList from './visionList';

interface IProps {
    onTrackChange: (path: string) => void;
}

const App = (props: IProps) => {
    return (
        <React.Fragment>
            <TrackList onTrackChange={props.onTrackChange} />
            <Player />
            <VisionList />
        </React.Fragment>
    );
};

export default App;