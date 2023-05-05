import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";
import VideoList from "../../components/Videos/VideoList";
import "../../styles/homePageStyle.css";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    const [popularVideos, setPopularVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    async function getPopularVideoList() {
        const response = await youtubeAPI.get("videos", {
            params: {
                part: "snippet, statistics, status, contentDetails",
                chart: "mostPopular",
                regionCode: "US",
                maxResults: 25,
                key: API_KEY,
            },
        });
        console.log("getPopularVideoList response", response);
        setPopularVideos(response.data.items);
    }

    function handleSelectedVideo(video) {
        //takes selected thumbnail id and sets it to selectedVideo
        setSelectedVideo(video.id);
    }

    function loadFirstVideo() {
        let firstVideo =
            popularVideos[Math.floor(Math.random() * popularVideos.length)];
        setSelectedVideo(!firstVideo ? "" : firstVideo.id);
    }

    useEffect(() => {
        getPopularVideoList();
    }, []);

    useEffect(() => {
        loadFirstVideo();
    }, [popularVideos]);

    // async function handleCheckToken() {
    //     const expDate = await usersService.checkToken();
    //     return console.log(expDate);
    // }

    return (
        <div className='home-page-container'>
            <div className='iframe-container'>
                <iframe
                    allowFullScreen
                    frameBorder='0'
                    width={"100%"}
                    height={"100%"}
                    title='Video Player'
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
                />
            </div>
            <div className='video-list-container'>
                <ul
                    style={{
                        color: "white",
                    }}
                >
                    <h2 style={{ textAlign: "center" }}>Popular Videos</h2>
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
