import "./App.css";
import React, { useState } from "react";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import AuthPage from "../Auth/AuthPage";
import UserHomePage from "../UserHomePage/UserHomePage";
import { NavBar } from "../../components/NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

export default function App() {
    const [user, setUser] = useState(getUser());
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState("");
    const [favorites, setFavorites] = useState([]);



    return (
        <div className='App'>
            {user ? (
                <>
                    <NavBar user={user} setUser={setUser} />
                    <Switch>
                        <Route path='/home/favorites'>
                            <FavoritesPage />
                        </Route>
                        <Route path='/home'>
                            <UserHomePage />
                        </Route>
                        <Redirect to='/home' />
                    </Switch>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </div>
    );
}
