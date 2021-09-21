import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <div>
            <h1>Auth Page</h1>
            {isLoginForm ? (
                <LoginForm setUser={setUser} />
            ) : (
                <SignUpForm setUser={setUser} />
            )}
            <button onClick={() => setIsLoginForm(!isLoginForm)}>
                {isLoginForm ? "Create Account" : "Already a Member, Login"}
            </button>
        </div>
    );
};

export default AuthPage;
