// import React from "react";
// import { Link } from "react-router-dom";
// import YouTubeIcon from "../../assets/YouTubeIcon.png";
// import "./NavBar.css";

// export const NavBar = ({
//     loggedInUser,
//     setLoggedInUser,
//     handleChange,
//     handleClickSearch,
//     searchTerm,
// }) => {
//     console.log("loggedInUser", loggedInUser);
//     return (
//         <nav className='navbar'>
//             <img src={YouTubeIcon} alt='YouTube Icon' />
//             <Link className='nav-link' to='/home'>
//                 Home
//             </Link>
//             {loggedInUser ? (
//                 <Link className='nav-link' to='/favorites'>
//                     Favorites
//                 </Link>
//             ) : null}
//             <div className='search-container'>
//                 <input
//                     type='text'
//                     value={searchTerm}
//                     onChange={handleChange}
//                     placeholder='Search'
//                     className='search-input'
//                 />
//                 <button className='search-button' onClick={handleClickSearch}>
//                     GO
//                 </button>
//             </div>
//             {loggedInUser ? (
//                 <>
//                     <span className='welcome-message'>
//                         Welcome, {loggedInUser?.name}
//                     </span>
//                     <button className="log-out-btn" onClick={()=> setLoggedInUser(null)}  >Log Out</button>
//                 </>
//             ) : (
//                 <span className='welcome-message'>
//                     <Link className='nav-link' to='/sign-in'>
//                         Sign In
//                     </Link>
//                 </span>
//             )}
//         </nav>
//     );
// };

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import YouTubeIcon from "../../assets/YouTubeIcon.png";
import "./NavBar.css";

export const NavBar = props => {
    const { handleChange, handleClick, handleKeyPress, searchTerm, searchResults } = props;

    return (
        <nav className='navbar'>
            <img src={YouTubeIcon} alt='YouTube Icon' className='navbar-icon' />
            <Link className='navbar-link' to='/home'>
                Home
            </Link>
            <Link className='navbar-link' to='/home/favorites'>
                Favorites
            </Link>
            <div className='navbar-search-wrapper'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder='Search'
                    className='navbar-search-input'
                />
                <button className='navbar-search-button' onClick={handleClick}>
                    <svg viewBox='0 0 24 24' className='navbar-search-icon'>
                        <path d='M10,2A8,8 0 0,1 18,10C18,11.85 17.36,13.55 16.24,14.88L21,19.64L19.64,21L14.88,16.24C13.55,17.36 11.85,18 10,18A8,8 0 0,1 2,10A8,8 0 0,1 10,2M10,4A6,6 0 0,0 4,10A6,6 0 0,0 10,16A6,6 0 0,0 16,10A6,6 0 0,0 10,4Z' />
                    </svg>
                </button>
                {searchResults.length > 0 && (
                    <ul className='navbar-search-results'>
                        {searchResults.map(result => (
                            <li key={result.id.videoId}>
                                {result.snippet.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* {user && (
                <>
                    <span className="navbar-user">Welcome {user.name}</span>
                    <Link className="navbar-link" to="/" onClick={handleLogOut}>
                        Log Out
                    </Link>
                </>
            )} */}
        </nav>
    );
};

NavBar.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired,
};
