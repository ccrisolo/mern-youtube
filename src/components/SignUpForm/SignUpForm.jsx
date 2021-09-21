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
            <div>
                <div className='form-container'>
                    <form autoComplete='off' onSubmit={this.handleSubmit}>
                        <label id='label-name'>Name</label>
                        <input
                            id='input-name'
                            type='text'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                        <label id='label-email'>Email</label>
                        <input
                            id='input-email'
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        <label id='label-password'>Password</label>
                        <input
                            id='input-password'
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <label id='label-confirm'>Confirm</label>
                        <input
                            id='input-confirm'
                            type='password'
                            name='confirm'
                            value={this.state.confirm}
                            onChange={this.handleChange}
                            required
                        />
                        <button type='submit' disabled={disable}>
                            SIGN UP
                        </button>
                    </form>
                </div>
                <p className='error-message'>&nbsp;{this.state.error}</p>
            </div>
        );
    }
}
