import React from "react";

const VideoList = ({ videos, handleSelectedVideo }) => {
    return videos.map((video, id) => (
        <li
            style={{ display: "flex", listStyle: "none", margin: "5px" }}
            key={id}
            onClick={() => handleSelectedVideo(video)}
        >
            <img
                alt='thumbnail'
                height='94px'
                width='168px'
                src={video.snippet.thumbnails.medium.url}
            />
            <div style={{ width: "200px", margin: "15px" }}>
                <span>{video.snippet.title}</span>
                <div>
                    <span>{video.snippet.channelTitle}</span>
                </div>
            </div>
        </li>
    ));
};

export default VideoList;
