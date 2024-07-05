// import React from "react";
// import {
//     useLocation,
//     useHistory,
// } from "react-router-dom/cjs/react-router-dom.min";
// import "./style.css";

// const SearchResultsPage = ({ handleSelectedVideo }) => {
//     const location = useLocation();
//     const history = useHistory();
//     const searchResults = location.state.searchResults;
//     console.log("search results page", searchResults);

//     const playVideo = videoId => {
//         console.log("videoId", videoId);
//         history.push(`/home/play/${videoId}`);
//     };

//     const videoThumbnail = searchResults.map((video, id) => (
//         <li
//             style={{
//                 display: "flex",
//                 padding: "2%",
//                 fontFamily: "Roboto",
//                 minWidth: "18%",
//                 maxWidth: "300px",
//             }}
//             key={id}
//             // onClick={() => {
//             //     playVideo(video?.id?.videoId); // Assuming video.id is the identifier for the video
//             //   }}
//             onClick={() => {
//                 handleSelectedVideo(video?.id?.videoId);
//                 history.push(`/home/play/${video?.id?.videoId}`);
//             }}
//         >
//             <img
//                 alt='thumbnail'
//                 style={{ borderRadius: "5px" }}
//                 height='98px'terminal
//                 width='172px'
//                 src={video.snippet.thumbnails.medium.url}
//             />
//             <div
//                 style={{
//                     padding: "2%",
//                     overflow: "hidden",
//                 }}
//             >
//                 <span
//                     style={{
//                         fontWeight: "bold",
//                         fontSize: 14,
//                         lineClamp: 3,
//                         textOverflow: "ellipsis",
//                     }}
//                 >
//                     {video.snippet.title}
//                 </span>
//                 <div>
//                     <span style={{ fontSize: 14, color: "grey" }}>
//                         {video.snippet.channelTitle}
//                     </span>
//                 </div>
//             </div>
//         </li>
//     ));

//     return (
//         <div>
//             <ul
//                 className='search-result-container'
//                 style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     flexWrap: "wrap",
//                     color: "white",
//                     marginLeft: "10%",
//                     paddingTop: "5rem",
//                 }}
//             >
//                 {videoThumbnail}
//             </ul>
//         </div>
//     );
// };

// export default SearchResultsPage;


import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./style.css";

const SearchResultsPage = ({ handleSelectedVideo }) => {
    const location = useLocation();
    const history = useHistory();
    const searchResults = location.state.searchResults;
    console.log("search results page", searchResults);

    const playVideo = (videoId) => {
        console.log("videoId", videoId);
        history.push(`/home/play/${videoId}`);
    };

    const videoThumbnail = searchResults.map((video, id) => (
        <li
            className="video-thumbnail"
            key={id}
            onClick={() => {
                handleSelectedVideo(video?.id?.videoId);
                history.push(`/home/play/${video?.id?.videoId}`);
            }}
        >
            <img
                alt="thumbnail"
                className="video-thumbnail-image"
                src={video.snippet.thumbnails.medium.url}
            />
            <div className="video-details">
                <span className="video-title">
                    {video.snippet.title}
                </span>
                <span className="video-channel">
                    {video.snippet.channelTitle}
                </span>
            </div>
        </li>
    ));

    return (
        <div className="search-results-page">
            <ul className="search-results-container">
                {videoThumbnail}
            </ul>
        </div>
    );
};

export default SearchResultsPage;
