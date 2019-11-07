import * as React from "react";

import Player from './player';
import TrackList from './trackList';
import VisionList from './visionList';

interface IProps {
    onTrackChange: (path: string) => void;
    onVisualizationChange: (id: string) => void;
}

const App = (props: IProps) => {
    return (
        <React.Fragment>
            <TrackList onTrackChange={props.onTrackChange} />
            <Player />
            <VisionList onVisualizationChange={props.onVisualizationChange}/>
        </React.Fragment>
    );
};

export default App;