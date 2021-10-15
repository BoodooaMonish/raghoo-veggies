import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { patterns, min_length, max_length, messages } from "../../validation";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.removeValidationHighlight = this.removeValidationHighlight.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            message_email: null,
            message_password: null,
            email: "",
            password: "",
        };
    }
    validateInput(event) {
        if (event.target.tagName !== "INPUT") return;
        let target = event.target;
        if (!target.value) {
            target.classList.add("login__input-box_fail");
            this.attachMessage(target.name, "empty");
            return;
        }
        if (min_length[`min_${target.name}`] !== null) {
            if (target.value.toString().length < min_length[`min_${target.name}`]) {
                target.classList.add("login__input-box_fail");
                this.attachMessage(target.name, `min_${target.name}`);
                return;
            }
        }
        if (max_length[`max_${target.name}`] !== null) {
            if (target.value.toString().length > max_length[`max_${target.name}`]) {
                target.classList.add("login__input-box_fail");
                this.attachMessage(target.name, `max_${target.name}`);
                return;
            }
        }
        if (patterns[target.name].test(target.value.toString())) {
            target.classList.add("login__input-box_success");
            this.setState(() => {
                return { [`message_${target.name}`]: null };
            });
        } else {
            target.classList.add("login__input-box_fail");
            this.attachMessage(target.name, target.name);
        }
    }
    attachMessage(name, text) {
        this.setState(() => {
            return { [`message_${name}`]: <p className="form__message">{messages[text]}</p> };
        });
    }
    removeValidationHighlight(event) {
        if (event.target.tagName !== "INPUT") return;
        let target = event.target;
        target.classList.remove("login__input-box_success");
        target.classList.remove("login__input-box_fail");
    }
    handleChange(event) {
        this.setState(() => {
            return { [event.target.name]: event.target.value };
        });
    }
    submitForm(event) {
        event.preventDefault();
        event.stopPropagation();
        alert("Feature not yet implemented");
    }
    render() {
        return (
            <section className="login" aria-labelledby="login-heading" aria-describedby="login-desc">
                <h2 id="login-heading" className="login__heading">
                    Sign in to Raghoo Veggies
                </h2>
                <p id="login-desc">Enter your login details to start shopping with us.</p>
                <form onBlur={this.validateInput} onFocus={this.removeValidationHighlight} className="login__form">
                    <div className="login__input">
                        <label htmlFor="login-email" className="login__input-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="login-email"
                            className="login__input-box"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    {this.state.message_email}
                    <div className="login__input">
                        <label htmlFor="login-password" className="login__input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="login-password"
                            className="login__input-box"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    {this.state.message_password}
                    <button onClick={this.submitForm} className="login__button">
                        Login
                    </button>
                </form>
                <div className="login__more-info">
                    <a href="#">Forgot Password?</a>
                    <p>
                        Don't have an account? <Link to="/register">Register Here</Link>
                    </p>
                </div>
            </section>
        );
    }
}
