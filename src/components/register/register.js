import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { patterns, min_length, max_length, messages } from "../../validation";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.removeValidationHighlight = this.removeValidationHighlight.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            message_firstName: null,
            message_lastName: null,
            message_email: null,
            message_password: null,
            message_confirmPassword: null,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    }
    validateInput(event) {
        if (event.target.tagName !== "INPUT") return;
        let target = event.target;
        if (!target.value) {
            target.classList.add("register__input-box_fail");
            this.attachMessage(target.name, "empty");
            return;
        }
        if (min_length[`min_${target.name}`] !== null) {
            if (target.value.toString().length < min_length[`min_${target.name}`]) {
                target.classList.add("register__input-box_fail");
                this.attachMessage(target.name, `min_${target.name}`);
                return;
            }
        }
        if (max_length[`max_${target.name}`] !== null) {
            if (target.value.toString().length > max_length[`max_${target.name}`]) {
                target.classList.add("register__input-box_fail");
                this.attachMessage(target.name, `max_${target.name}`);
                return;
            }
        }
        if (target.name === "confirmPassword") {
            if (patterns["password"].test(target.value.toString()) && target.value === this.state.password) {
                target.classList.add("register__input-box_success");
                this.setState(() => {
                    return { [`message_${target.name}`]: null };
                });
                return;
            } else {
                target.classList.add("register__input-box_fail");
                this.attachMessage(target.name, target.name);
                return;
            }
        }
        if (patterns[target.name].test(target.value.toString())) {
            target.classList.add("register__input-box_success");
            this.setState(() => {
                return { [`message_${target.name}`]: null };
            });
        } else {
            target.classList.add("register__input-box_fail");
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
        target.classList.remove("register__input-box_success");
        target.classList.remove("register__input-box_fail");
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
            <section className="register" aria-labelledby="register-heading" aria-describedby="register-desc">
                <h2 id="register-heading" className="register__heading">
                    Sign Up to Raghoo Veggies
                </h2>
                <p id="register-desc">Enter the required information to create your account.</p>

                <form onBlur={this.validateInput} onFocus={this.removeValidationHighlight} className="register__form">
                    <div className="register__input">
                        <label htmlFor="firstName-label" className="register__input-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName-label"
                            className="register__input-box"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                        />
                    </div>
                    {this.state.message_firstName}
                    <div className="register__input">
                        <label htmlFor="lastName-label" className="register__input-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName-label"
                            className="register__input-box"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                        />
                    </div>
                    {this.state.message_lastName}
                    <div className="register__input">
                        <label htmlFor="register-email" className="register__input-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="register-email"
                            className="register__input-box"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    {this.state.message_email}
                    <div className="register__input">
                        <label htmlFor="register-password" className="register__input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            className="register__input-box"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    {this.state.message_password}
                    <div className="register__input">
                        <label htmlFor="confirmPassword-label" className="register__input-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword-label"
                            className="register__input-box"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                        />
                    </div>
                    {this.state.message_confirmPassword}
                    <button onClick={this.submitForm} className="register__button">
                        Register
                    </button>
                </form>

                <div className="register__more-info">
                    <p>
                        Already have an account? <Link to="/login">Login Here</Link>
                    </p>
                </div>
            </section>
        );
    }
}
