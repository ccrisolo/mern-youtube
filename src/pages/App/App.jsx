import "./App.css";
import React, { useState } from "react";
import NewOrderPage from "../FavoritesPage";
import AuthPage from "../AuthPage";
import UserHomePage from "../UserHomePage";
import { NavBar } from "../../components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

export default function App() {
    const [user, setUser] = useState(getUser());

    return (
        <main className='App'>
            {user ? (
                <>
                    <NavBar user={user} setUser={setUser} />
                    <Switch>
                        <Route path='/home/favorites'>
                            <NewOrderPage />
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
        </main>
    );
}
