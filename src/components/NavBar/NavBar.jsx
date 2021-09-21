import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export const NavBar = ({ user, setUser }) => {
    //Add the logout function
    const handleLogOut = () => {
        //delegate log out to users-service
        userService.logOut();
        //update state will also cause a re-render
        setUser(null);
    };

    return (
        <nav>
            <Link to='/home'>Home</Link>
            &nbsp; | &nbsp;
            <Link to='/home/favorites'>Favorites</Link>
            &nbsp;&nbsp;<span>Welcome {user.name}</span>
            &nbsp;&nbsp;
            <Link to='' onClick={handleLogOut}>
                Log Out
            </Link>
        </nav>
    );
};
