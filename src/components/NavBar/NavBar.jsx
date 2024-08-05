import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import YouTubeIcon from "../../assets/YouTubeIcon.png";
import "./NavBar.css";

export const NavBar = props => {
    const {
        handleChange,
        handleClick,
        handleKeyPress,
        handleClear,
        searchTerm,
        searchResults,
    } = props;

    return (
        <nav className='navbar'>
            <img src={YouTubeIcon} alt='YouTube Icon' className='navbar-icon' />
            <Link className='navbar-link' to='/home'>
                Home
            </Link>
            <Link className='navbar-link' to='/favorites'>
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
                <button className='clear-input-button' onClick={handleClear}>
                    <svg
                        viewBox='0 0 24 24'
                        className='clear-input-icon'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </button>
                <button className='navbar-search-button' onClick={handleClick}>
                    <svg viewBox='0 0 24 24' className='navbar-search-icon'>
                        <path d='M10,2A8,8 0 0,1 18,10C18,11.85 17.36,13.55 16.24,14.88L21,19.64L19.64,21L14.88,16.24C13.55,17.36 11.85,18 10,18A8,8 0 0,1 2,10A8,8 0 0,1 10,2M10,4A6,6 0 0,0 4,10A6,6 0 0,0 10,16A6,6 0 0,0 16,10A6,6 0 0,0 10,4Z' />
                    </svg>
                </button>
                {searchResults?.length > 0 && searchTerm && (
                    <ul className='navbar-search-results'>
                        {searchResults.map(result => (
                            <li key={result.id.videoId} onClick={handleClick}>
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
