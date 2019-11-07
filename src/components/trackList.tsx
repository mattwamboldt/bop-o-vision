import * as React from 'react';

interface IProps {
    onTrackChange: (path: string) => void;
}

const TrackList = (props: IProps) => {
    const tracks = [
        {
            name: "Carefree",
            path: "audio/carefree.mp3"
        },
        {
            name: "Celebration",
            path: "audio/celebration.mp3"
        }
    ];

    const [currentTrack, setCurrentTrack] = React.useState(1);

    return (
        <div id="tracklist">
            <h2>Tracks</h2>
            <ul>
                {tracks.map((v, index) => {
                    const className = index === currentTrack ? 'active' : '';

                    return (
                        <li key={index}>
                            <a className={className}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentTrack(index);
                                    props.onTrackChange(v.path);
                                }}>{index + 1} - {v.name}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TrackList;