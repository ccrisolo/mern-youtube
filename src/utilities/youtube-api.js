// import { response } from "express";
// import * as usersService from "../utilities/users-service";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const MOST_POPULAR_URL = "https://developers.google.com/apis-explorer/#p/youtube/v3"

export default axios.create({
    baseURL: BASE_URL,
    // baseURL: MOST_POPULAR_URL,
    
});

