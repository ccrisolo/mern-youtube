import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import YouTubeImg from "../../assets/YouTube2.png";

const AuthPage = ({ setUser }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <div className='wrapper'>
            <div className='img-wrapper'>
                <img
                    className='youtube-img'
                    src={YouTubeImg}
                    alt='YouTube Image'
                />
            </div>
            <div className='auth-form-wrapper'>
                {isLoginForm ? (
                    <LoginForm
                        setUser={setUser}
                        setIsLoginForm={setIsLoginForm}
                        isLoginForm={isLoginForm}
                    />
                ) : (
                    <SignUpForm
                        setUser={setUser}
                        setIsLoginForm={setIsLoginForm}
                        isLoginForm={isLoginForm}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
