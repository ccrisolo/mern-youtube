import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";
import VideoList from "../../components/Videos/VideoList";
import "./UserHomePage.css";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    const [popularVideos, setPopularVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
    const [publishDate, setPublishDate] = useState(null);

    //handleSearch
    //input takes in a string
    //string gets sent to fetch endpoint
    //get first 10 results

    function handleSelectedVideo(video) {
        //takes selected thumbnail id and sets it to selectedVideo
        // console.log("video.id", video.id);
        console.log("video", video.snippet);
        setSelectedVideoTitle(video.snippet.title);
        setPublishDate(video.snippet.publishedAt)
        setSelectedVideo(video.id);
    }

    useEffect(() => {
        const popularVideoList = async () => {
            const response = await youtubeAPI.get("videos", {
                params: {
                    part: "snippet",
                    chart: "mostPopular",
                    regionCode: "US",
                    maxResults: 10,
                    key: API_KEY,
                },
            });
            setPopularVideos(response.data.items);
        };
        popularVideoList();
    }, []);

    useEffect(() => {
        const loadFirstVideo = () => {
            let firstVideo =
                popularVideos[Math.floor(Math.random() * popularVideos.length)];
            setSelectedVideo(!firstVideo ? "" : firstVideo.id);
            setSelectedVideoTitle(!firstVideo ? "" : firstVideo.snippet.title);
            setPublishDate(!firstVideo ? "" : firstVideo.snippet.publishedAt);
        };
        loadFirstVideo();
    }, [popularVideos]);

    // console.log("popularVideos", popularVideos);

    // async function handleCheckToken() {
    //     const expDate = await usersService.checkToken();
    //     return console.log(expDate);
    // }
    return (
        <div className='page-wrapper'>
            <div className='iframe-wrapper'>
                <iframe
                    allowFullScreen
                    frameBorder='0'
                    height='100%'
                    title='Video Player'
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
                />
                <h2>{selectedVideoTitle}</h2>
                <p>{publishDate}</p>
            </div>
            <div className='list-wrapper'>
                <ul>
                    <h2>Popular Videos</h2>
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
