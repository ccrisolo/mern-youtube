import React from "react";

const VideoList = ({ videos, handleSelectedVideo, setSelectedVideo }) => {
    return videos.map((video, id) => (
        <li style={{ listStyle: "none" , margin: '20px'}} key={id} onClick={() => handleSelectedVideo(video)} >
            <img alt='thumbnail' src={video.snippet.thumbnails.medium.url} />
            <div style={{width: '300px' }}>
                <span>{video.snippet.title}</span>
                <span>{video.snippet.channelTitle}</span>
                <span>{video.snippet.tags}</span>
            </div>
        </li>
    ));
};

export default VideoList;
