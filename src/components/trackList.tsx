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
        <ul id="tracklist">
            {tracks.map((v, index) => {
                const className = index === currentTrack ? 'active' : '';

                return (
                    <li key={index}>
                        <a className={className}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentTrack(index);
                                props.onTrackChange(v.path);
                            }}>{v.name}</a>
                    </li>
                );
            })}
        </ul>
    );
};

export default TrackList;