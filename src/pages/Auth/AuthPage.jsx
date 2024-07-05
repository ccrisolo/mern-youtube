import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import YouTubeImg from "../../assets/YouTube2.png";

const AuthPage = ({ setLoggedInUser }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <div className='wrapper'>
            <div className='img-wrapper'>
                <img
                    className='youtube-img'
                    src={YouTubeImg}
                    alt='YouTube Logo'
                />
            </div>
            <div className='auth-form-wrapper'>
                {isLoginForm ? (
                    <LoginForm
                        setLoggedInUser={setLoggedInUser}
                        setIsLoginForm={setIsLoginForm}
                        isLoginForm={isLoginForm}
                    />
                ) : (
                    <SignUpForm
                        setLoggedInUser={setLoggedInUser}
                        setIsLoginForm={setIsLoginForm}
                        isLoginForm={isLoginForm}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
