import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";
import VideoList from "../../components/Videos/VideoList";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    const [popularVideos, setPopularVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
   

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
                // console.log("firstVideo", !firstVideo ? '' : firstVideo.id)
            setSelectedVideo(!firstVideo ? '' : firstVideo.id);
        };
        loadFirstVideo();
    }, [popularVideos]);

    // console.log("popularVideos", popularVideos);
    

    async function handleCheckToken() {
        const expDate = await usersService.checkToken();
        return console.log(expDate);
    }

    return (
        <div>
            <h1>User Home Page</h1>
            <button onClick={handleCheckToken}>
                Check When My Login Expires
            </button>
            <div>
                <iframe
                    frameBorder='0'
                    height='400px'
                    width='700px'
                    title='Video Player'
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
                />
            </div>
            <h2>Popular Videos</h2>
            <div>
                <ul>
                    <VideoList videos={popularVideos} />
                </ul>
            </div>
        </div>
    );
};

export default UserHomePage;
