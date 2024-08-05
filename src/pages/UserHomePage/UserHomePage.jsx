import React from "react";
import VideoList from "../../components/Videos/VideoList";
import "./style.css";

const UserHomePage = props => {
    const {
        selectedVideo,
        popularVideos,
        handleSelectedVideo,
        setSelectedVideo,
    } = props;

    console.log("selectedVideo", selectedVideo);
    return (
        <div className='home-page-container'>
            <div className='iframe-container'>
                <iframe
                    allowFullScreen
                    frameBorder='0'
                    width={"100%"}
                    height={"100%"}
                    title='Video Player'
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo?.id}`}
                />
                <div
                    style={{
                        padding: "2%",
                    }}
                >
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: 24,
                            lineClamp: 3,
                            textOverflow: "ellipsis",
                            color: "white",
                        }}
                    >
                        {selectedVideo?.snippet?.title}
                    </span>
                    <div>
                        <span
                            style={{
                                fontSize: 16,
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            {selectedVideo?.snippet?.channelTitle}
                        </span>
                    </div>
                    <div>
                        <span style={{ fontSize: 16, color: "grey" }}>
                            Views: {selectedVideo?.statistics?.viewCount}
                        </span>
                    </div>
                </div>
            </div>
            <div className='video-list-container'>
                <ul
                    style={{
                        color: "white",
                    }}
                >
                    <h2 style={{ textAlign: "center" }}>Most Popular Videos</h2>
                    <VideoList
                        videos={popularVideos}
                        handleSelectedVideo={handleSelectedVideo}
                        setSelectedVideo={setSelectedVideo}
                    />
                </ul>
            </div>
        </div>
    );
};

export default UserHomePage;
