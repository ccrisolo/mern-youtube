import React from "react";

const VideoList = ({ videos, handleSelectedVideo }) => {
    return videos.map((video, id) => (
        <li
            style={{
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                justifyContent: "center",
                gap: "5%",
                marginTop: "2%",
            }}
            key={id}
            onClick={() => handleSelectedVideo(video)}
        >
            <img
                alt='thumbnail'
                height='94px'
                width='168px'
                src={video.snippet.thumbnails.medium.url}
            />
            <div
                style={{
                    width: "250px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <span style={{ fontWeight: "600" }}>{video.snippet.title}</span>
                <br />
                <span>{video.snippet.channelTitle}</span>
            </div>
        </li>
    ));
};

export default VideoList;
