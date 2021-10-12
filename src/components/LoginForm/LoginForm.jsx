import React, { useState } from "react";
import "./LoginForm.css";
import * as usersService from "../../utilities/users-service";

export default function LogIn({ setUser, isLoginForm, setIsLoginForm }) {
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
        try {
            // The promise returned by the signUp service method
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await usersService.login(credentials);
            setUser(user);
        } catch {
            setError("Log In Failed - Try Again");
        }
    }

    return (
        <div className='wrapper'>
            <div className='form-container'>
                <h2 className='app-name'>YouTube</h2>
                <div>
                    <h1 className='heading'>
                        Get access to videos from around the world!
                    </h1>
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
