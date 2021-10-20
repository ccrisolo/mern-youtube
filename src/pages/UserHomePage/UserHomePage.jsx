import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    const [videos, setVideos] = useState([]);
    // const [selectedVideo, setSelectedVideo] = useState("");
    // const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const popularVideoList = async () => {
            const response = await youtubeAPI.get("videos", {
                params: {
                    part: ["snippet", "contentDetails", "statistics"],
                    chart: "mostPopular",
                    regionCode: "US",
                    maxResults: 8,
                    key: API_KEY,
                },
            })
            console.log("response", response.data.items)
        };
        popularVideoList()
    }, []);
  

    async function handleCheckToken() {
        const expDate = await usersService.checkToken();
        return console.log(expDate);
    }

    return (
        <>
            <h1>User Home Page</h1>
            <button onClick={handleCheckToken}>
                Check When My Login Expires
            </button>
        </>
    );
};

export default UserHomePage;
