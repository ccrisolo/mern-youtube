import React, { useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import youtubeAPI from "../../utilities/youtube-api";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const UserHomePage = () => {
    // const [videos, setVideos] = useState([]);
    // const [selectedVideo, setSelectedVideo] = useState("");
    // const [favorites, setFavorites] = useState([]);

  

    useEffect(() => {
        const videoList = async () => {
            const response = await youtubeAPI.get("search", {
                params: {
                    part: "snippet",
                    maxResults: 8,
                    key: API_KEY,
                    q:'basketball'
                },
            })
            console.log("response", response.data.items)
        };
        videoList()
    }, []);
    // useEffect(() => {
    //     const videoList = async () => {
    //         const response = await youtubeAPI.get("youtube.search.list", {
    //             params: {
    //                 part: "snippet",
    //                 chart: "mostPopular",
    //                 regionCode: "us",
    //                 maxResults: 8,
    //                 key: API_KEY,
    //             },
    //         })
    //         console.log("response", response)
    //     };
    //     videoList()
    // }, []);

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
