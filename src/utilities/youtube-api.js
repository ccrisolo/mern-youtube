// import { response } from "express";
// import * as usersService from "../utilities/users-service";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export default axios.create({
    baseURL: BASE_URL,
    
});

