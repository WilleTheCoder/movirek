import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { config } from '../config';
import '../styling/youtubeplayer.css';

function YouTubePlayer({ movie_id }) {

    const [vidData, setVidData] = useState(null)

    const opts = {
        height: '250', // Adjust the height as needed
        width: '400',  // Adjust the width as needed
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            iv_load_policy: 3,
            rel: 0,
            loop: 0,
            controls: 0,
            // color: blue,
        },
    };

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };


    useEffect(() => {
        // fetching movie videos
        fetch(`http://localhost:5000/videos?movie_id=${movie_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('failed fetch')
                }
                return res.json()
            })
            .then((data) => {
                console.log('videos: ', data);
                setVidData(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className='trailer-wrapper'>

                {vidData && vidData.slice(0, 2).map(vid => (
                    <div className='trailer'>
                        <YouTube videoId={vid.key} opts={opts} onReady={_onReady} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default YouTubePlayer;
