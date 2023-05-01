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
    const videoStatistics = async () => {
        const response = await youtubeAPI.get("videos", {
            params: {
                part: "statistics",
                regionCode: "US",
                key: API_KEY,
            },
        });
        return console.log('response', response);
    };

    useEffect(() => {
        popularVideoList();
        videoStatistics()
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

    console.log('popularVideos', popularVideos)

    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "black",
                fontFamily: "Roboto",
            }}
        >
            <div
                className='iframe-wrapper'
                style={{
                    display: "flex",
                    margin: "60px",
                    borderRadius: "10px",
                    backgroundColor: "black",
                    width: "907px",
                    height: "510px",
                    padding: "8px",
                    marginTop: "40px",
                }}
            >
                <iframe
                    allowFullScreen
                    frameBorder='0'
                    width='907px'
                    height='510px'
                    title='Video Player'
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo}`}
                />
            </div>
            <div>
                <ul
                    style={{
                        // display: "flex",
                        // flexWrap: "wrap",
                        color: "white",
                        backgroundColor: "black",
                    }}
                >
                    <div>
                        <h2>Popular Videos</h2>
                    </div>
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
