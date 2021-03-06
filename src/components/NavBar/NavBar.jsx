import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { F } from "@fortawesome/react-fontawesome";

export const NavBar = ({ user, setUser }) => {
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
            }}
        >
            <Link to='/home'>Home</Link>
            <Link to='/home/favorites'>Favorites</Link>
            &nbsp;&nbsp;
            <div role='search' onSubmit={() => {}}>
                <input
                    placeholder='Search'
                    style={{
                        height: "30px",
                        width: "700px",
                        paddingLeft: "10px",
                    }}
                />
                <button style={{ height: "36px", width: "50px" }}>GO</button>
            </div>
            <span style={{ fontFamily: "sans-serif" }}>
                Welcome {user.name}
            </span>
            &nbsp;&nbsp;
            <Link to='' onClick={handleLogOut}>
                Log Out
            </Link>
        </nav>
    );
};
