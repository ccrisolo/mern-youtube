const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require('cors');
const axios = require('axios');

require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

// Configure both serve-favicon & static middleware to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to verify token and assign user object of payload to req.user.
app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// New route to handle YouTube API requests
app.get("/api/search", async (req, res) => {
    const { q } = req.query;
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet, statistics, status, contentDetails',
                maxResults: 5,
                q,
                type: 'video',
                key: API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching search results", error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

// Route to fetch most popular videos
app.get("/api/most-popular-videos", async (req, res) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet, statistics, status, contentDetails',
                chart: 'mostPopular',
                regionCode: 'US',
                maxResults: 25,
                key: API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching most popular videos", error);
        res.status(500).json({ error: 'Failed to fetch most popular videos' });
    }
});

// The following "catch all" route (note the *) is necessary to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
