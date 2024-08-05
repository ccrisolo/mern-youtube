import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import AuthPage from "../Auth/AuthPage";
import UserHomePage from "../UserHomePage/UserHomePage";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import { NavBar } from "../../components/NavBar/NavBar";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import axios from "axios";
import { debounce } from "lodash";

export default function App() {
    const [loggedInUser, setLoggedInUser] = useState(getUser());
    const [popularVideos, setPopularVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory();

    function handleSelectedVideo(video) {
        //takes selected thumbnail id and sets it to selectedVideo
        console.log('video',video)
        setSelectedVideo(video);
    }

    function loadFirstVideo() {
        let firstVideo =
            popularVideos[Math.floor(Math.random() * popularVideos.length)];
            console.log('frstvideo', firstVideo)
        setSelectedVideo(!firstVideo ? "" : firstVideo);
    }

    const fetchSearchResults = useCallback(
        debounce(async term => {
            if (term.trim() !== "") {
                try {
                    const results = await axios.get("/api/search", {
                        params: { q: term, },
                    });
                    console.log('results', results)
                    setSearchResults(results.data.items);
                  
                } catch (error) {
                    console.error("Error fetching search results", error);
                }
            } else {
                setSearchResults([]);
            }
        }, 300), // Delay of 300ms
        []
    );

    const handleChange = event => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        fetchSearchResults(searchTerm);
    };

    const handleClick = async () => {
        history.push({
            pathname: "/search-results",
            state: { searchResults: searchResults },
        });
        setSearchResults([])
    };

    const handleClear = () => {
        setSearchTerm("")
    }

    async function handleKeyPress(event) {
        if (event.key === "Enter") {
            await handleClick();
            setSearchResults([])
        }
    }
    
    useEffect(() => {
        async function fetchPopularVideos() {
            try {
                const response = await axios.get("/api/most-popular-videos");
                setPopularVideos(response.data.items);
            } catch (error) {
                console.error("Error fetching most popular videos", error);
            }
        }

        fetchPopularVideos();
    }, []);


    useEffect(() => {
        loadFirstVideo();
    }, [popularVideos]);

    return (
        <div className='App'>
            <NavBar
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                handleChange={handleChange}
                handleClick={handleClick}
                handleKeyPress={handleKeyPress}
                handleClear={handleClear}
                searchTerm={searchTerm}
                searchResults={searchResults}
            />
            <Switch>
                <Route path='/home'>
                    <UserHomePage
                        selectedVideo={selectedVideo}
                        popularVideos={popularVideos}
                        handleSelectedVideo={handleSelectedVideo}
                        setSelectedVideo={selectedVideo}
                    />
                </Route>
                <Route path='/favorites'>
                    <FavoritesPage />
                </Route>
                <Route path='/search-results'>
                    <SearchResultsPage
                        searchResults={searchResults}
                        handleSelectedVideo={handleSelectedVideo}
                    />
                </Route>
                <Route
                    path='/home/play/:videoId'
                    component={
                        <UserHomePage
                            selectedVideo={selectedVideo?.videoId}
                            popularVideos={popularVideos}
                            handleSelectedVideo={handleSelectedVideo}
                            setSelectedVideo={selectedVideo}
                        />
                    }
                />

                <Route path='/sign-in'>
                    <AuthPage setLoggedInUser={setLoggedInUser} />
                </Route>
                <Redirect to='/home' />
            </Switch>

            {/* {loggedInUser ? (
                <>
                    <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                    <Switch>
                    //only have favorites page available to logged in users
                        <Route path='/home/favorites'>
                            <FavoritesPage />
                        </Route>
                        <Route path='/home'>
                            <UserHomePage />
                        </Route>
                        <Redirect to='/home' />
                    </Switch>
                </>
            ) : (
                <AuthPage setLoggedInUser={setLoggedInUser} />
            )} */}
        </div>
    );
}
