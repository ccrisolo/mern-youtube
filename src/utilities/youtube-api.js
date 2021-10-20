// import { response } from "express";
// import * as usersService from "../utilities/users-service";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const MOST_POPULAR_URL = "https://developers.google.com/apis-explorer/#p/youtube/v3"

export default axios.create({
    baseURL: BASE_URL,
    // baseURL: MOST_POPULAR_URL,
    
});

// const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// export const fetchPopular = async () => {
//     let response = await fetch(BASE_URL + "/videos", {
//         method: "GET",
//         headers: {
//             "Content-type": "application/json",
//             Authorization: "Bearer" + usersService.getToken(),
//             "X-API-KEY": "API_KEY",
//         },
//     });

//     let data = response.json();
//     console.log("data", data);
// };
