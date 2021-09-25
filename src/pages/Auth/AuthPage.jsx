import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    return (
        <>
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
        </>
    );
};

export default AuthPage;
