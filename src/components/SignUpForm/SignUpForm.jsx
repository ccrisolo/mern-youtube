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
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "45px",
                            marginRight: "45px",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                        autoComplete='off'
                        onSubmit={this.handleSubmit}
                    >
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
                        <div>
                            <button
                                style={{
                                    justifySelf: "center",
                                    border: "none",
                                    width: "30vw",
                                    height: "5vh",
                                    borderRadius: "25px",
                                    marginTop: "25px",
                                }}
                                type='submit'
                                disabled={disable}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
                <p className='error-message'>&nbsp;{this.state.error}</p>
            </div>
        );
    }
}
