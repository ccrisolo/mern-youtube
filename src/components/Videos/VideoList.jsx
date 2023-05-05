import React from "react";
import moment from "moment";

const VideoList = ({ videos, handleSelectedVideo }) => {
    console.log('videos', videos)

   videos.map((video, id) =>{

       const duration = video?.contentDetails?.duration
       const durationInMinutes = Math.floor(moment.duration(duration).asMinutes());
       const durationInSeconds = moment.duration(duration).seconds();
       console.log('duration', duration)
       console.log('durationInMinutes', durationInMinutes)
       console.log('durationInSeconds', durationInSeconds)
   })

    

    return videos.map((video, id) => (
        <li
            style={{ display: "flex", padding: "2%" }}
            key={id}
            onClick={() => handleSelectedVideo(video)}
        >
            <img
                alt='thumbnail'
                style={{ borderRadius: "5px" }}
                height='98px'
                width='172px'
                src={video.snippet.thumbnails.medium.url}
            />
            <div
                style={{
                    padding: "2%",
                    overflow: "hidden",
                }}
            >
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        lineClamp: 3,
                        textOverflow: "ellipsis",
                    }}
                >
                    {video.snippet.title}
                </span>
                <div>
                    <span style={{ fontSize: 14, color: "grey" }}>
                        {video.snippet.channelTitle}
                    </span>
                </div>
            </div>
        </li>
    ));
};

export default VideoList;
