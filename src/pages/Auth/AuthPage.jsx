import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import YouTubeImg from "../../assets/YouTube2.png";

const AuthPage = ({ setUser }) => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    return (
        <div className='wrapper'>
            <div className='img-wrapper'>
                <img
                    className='youtube-img'
                    src={YouTubeImg}
                    alt='YouTube Image'
                />
            </div>
            {isLoginForm ? (
                <LoginForm
                    className='login-form'
                    setUser={setUser}
                    setIsLoginForm={setIsLoginForm}
                    isLoginForm={isLoginForm}
                />
            ) : (
                <div className='signup-form-wrapper'>
                    <SignUpForm
                        setUser={setUser}
                        setIsLoginForm={setIsLoginForm}
                        isLoginForm={isLoginForm}
                    />
                </div>
            )}
        </div>
    );
};

export default AuthPage;
