import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import axios from "axios";
import YouTubeIcon from '../../assets/YouTubeIcon.png'

export const NavBar = ({ user, setUser }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    const handleChange = async event => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        if (searchTerm.trim() !== "") {
            const results = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchTerm}&type=video&key=${API_KEY}`
            );
            console.log("search results", results);
            setSearchResults(results.data.items);
        } else {
            setSearchResults([]);
        }
    };

    const handleLogOut = () => {
        //delegate log out to users-service
        userService.logOut();
        //update state will also cause a re-render
        setUser(null);
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "15px",
                backgroundColor: "rgb(19,19,19)",
                fontFamily: "Roboto",
                padding: "1%",
                fontWeight:"bold",
                fontSize:17
            }}
        >
            <img src={YouTubeIcon} />
            <Link style={{ color: "red", textDecoration: "none" }} to='/home'>
                Home
            </Link>
            <Link
                style={{ color: "red", textDecoration: "none" }}
                to='/home/favorites'
            >
                Favorites
            </Link>
            &nbsp;&nbsp;
            <div role='search' onSubmit={() => {}}>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder='Search'
                    style={{
                        height: "30px",
                        width: "600px",
                        paddingLeft: "10px",
                        borderRadius: "10px",
                    }}
                />
                <button
                    style={{
                        height: "36px",
                        width: "50px",
                        borderRadius: "10px",
                    }}
                >
                    GO
                </button>
                <ul style={{ backgroundColor: "white", listStyle: "none" }}>
                    {searchResults.map(result => (
                        <li key={result.id.videoId}>{result.snippet.title}</li>
                    ))}
                </ul>
            </div>
            <span style={{ color: "white" }}>
                Welcome
                {/* {user.name} */}
            </span>
            {/* &nbsp;&nbsp;
            <Link style={{color: 'red'}} to='' onClick={handleLogOut}>
                Log Out
            </Link> */}
        </nav>
    );
};
