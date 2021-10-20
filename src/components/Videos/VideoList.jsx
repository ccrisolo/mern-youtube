import React from "react";

const VideoList = ({ videos }) => {
    return videos.map((video, id) => (
        <li style={{ listStyle: "none" }} key={id}>
            <img alt='thumbnail' src={video.snippet.thumbnails.medium.url} />
            <div style={{width: '400px'}}>
                <span>{video.snippet.title}</span>
                <span>{video.snippet.channelTitle}</span>
                <span>{video.snippet.tags}</span>
            </div>
        </li>
    ));
};

export default VideoList;
