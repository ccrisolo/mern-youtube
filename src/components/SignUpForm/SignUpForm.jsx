import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
    };

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: "",
        });
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            const formData = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            const user = await signUp(formData);
            this.props.setUser(user);
        } catch {
            this.setState({ error: "Sign Up Failed - Try Again" });
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div className='wrapper'>
                <div className='form-container'>
                    <h2 className='app-name'>YouTube</h2>
                    <div>
                        <h1 className='heading'>
                            Get access to videos from around the world!
                        </h1>
                    </div>
                    <form autoComplete='off' onSubmit={this.handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                className='signup-form-input'
                                type='text'
                                name='name'
                                placeholder='Enter Name'
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                className='signup-form-input'
                                type='email'
                                name='email'
                                placeholder='Enter Email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                className='signup-form-input'
                                type='password'
                                name='password'
                                placeholder='Enter Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Confirm</label>
                            <input
                                className='signup-form-input'
                                type='password'
                                name='confirm'
                                placeholder='Confirm Password'
                                value={this.state.confirm}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className='signup-btn-container'>
                            <button
                                className='signup-btn'
                                type='submit'
                                disabled={disable}
                            >
                                SIGN UP
                            </button>
                        </div>
                        <div className='form-change-btn-container'>
                            <button
                                className='form-change-btn'
                                type='submit'
                                onClick={() => {
                                    this.props.setIsLoginForm(
                                        !this.props.isLoginForm
                                    );
                                }}
                            >
                                HAVE AN ACCOUNT?
                            </button>
                        </div>
                    </form>
                    {this.state.error && (
                        <div className='error-message-container'>
                            <p className='error-message'>
                                &nbsp;{this.state.error}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
