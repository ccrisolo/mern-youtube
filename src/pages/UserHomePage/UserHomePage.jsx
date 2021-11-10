import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";
import VideoList from "../../components/Videos/VideoList";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    const [popularVideos, setPopularVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    //handleSearch
    //input takes in a string
    //string gets sent to fetch endpoint
    //get first 10 results

    function handleSelectedVideo(video) {
        //takes selected thumbnail id and sets it to selectedVideo
        // console.log("video.id", video.id);
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
        };
        loadFirstVideo();
    }, [popularVideos]);

    // console.log("popularVideos", popularVideos);

    // async function handleCheckToken() {
    //     const expDate = await usersService.checkToken();
    //     return console.log(expDate);
    // }

    return (
        <div style={{ display: "flex", marginTop: "30px", marginLeft: "2%" }}>
            <iframe
                allowFullScreen
                frameBorder='0'
                height='700px'
                width='11000px'
                title='Video Player'
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
            />
            <ul>
                <span style={{ fontWeight: "600" }}>Popular Videos</span>
                <VideoList
                    videos={popularVideos}
                    handleSelectedVideo={handleSelectedVideo}
                    setSelectedVideo={setSelectedVideo}
                />
            </ul>
        </div>
    );
};

export default UserHomePage;
