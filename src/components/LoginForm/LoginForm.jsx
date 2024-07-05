import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";
import * as usersService from "../../utilities/users-service";

export default function LogIn({ setLoggedInUser, isLoginForm, setIsLoginForm }) {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError("");
    }

    async function handleSubmit(evt) {
        //prevent form from being submitted to the server
        evt.preventDefault();

        // The promise returned by the signUp service method
        // will resolve to the user object included in the
        // payload of the JSON Web Token (JWT)
        const user = await usersService.login(credentials);
        if (user) {
            console.log("user", user);
            setLoggedInUser(user);
            history.push("/home");
        } else {
            setError("Log In Failed - Try Again");
        }
    }

    return (
        <div className='wrapper'>
            <div className='form-container'>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        color: "white",
                        fontFamily: "Roboto",
                        paddingTop: "8%",
                    }}
                >
                    <h1>Welcome to my YouTube Clone.</h1>
                    <h2>Sign in to access additional features</h2>
                </div>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            className='login-form-input'
                            type='text'
                            name='email'
                            placeholder='Enter Email'
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            className='login-form-input'
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='login-btn-container'>
                        <button className='login-btn' type='submit'>
                            LOG IN
                        </button>
                    </div>
                    <div className='form-change-btn-container'>
                        <button
                            className='form-change-btn'
                            type='submit'
                            onClick={() => setIsLoginForm(!isLoginForm)}
                        >
                            NEED AN ACCOUNT?
                        </button>
                    </div>
                </form>
                {error && (
                    <div className='error-message-container'>
                        <p className='error-message'>&nbsp;{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
