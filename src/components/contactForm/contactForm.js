import React, { Component } from "react";
import "./contactForm.css";
import { patterns, min_length, max_length, messages } from "../../validation";

export default class Contact extends Component {
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
            message_subject: null,
            message_msgContent: null,
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            msgContent: "",
        };
    }
    validateInput(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            let target = event.target;
            if (!target.value) {
                target.classList.add("contact-form__input-box_fail");
                this.attachMessage(target.name, "empty");
                return;
            }
            if (min_length[`min_${target.name}`] !== null) {
                if (target.value.toString().length < min_length[`min_${target.name}`]) {
                    target.classList.add("contact-form__input-box_fail");
                    this.attachMessage(target.name, `min_${target.name}`);
                    return;
                }
            }
            if (max_length[`max_${target.name}`] !== null) {
                if (target.value.toString().length > max_length[`max_${target.name}`]) {
                    target.classList.add("contact-form__input-box_fail");
                    this.attachMessage(target.name, `max_${target.name}`);
                    return;
                }
            }
            if (patterns[target.name].test(target.value.toString())) {
                target.classList.add("contact-form__input-box_success");
                this.setState(() => {
                    return { [`message_${target.name}`]: null };
                });
            } else {
                target.classList.add("contact-form__input-box_fail");
                this.attachMessage(target.name, target.name);
            }
        } else {
            return;
        }
    }
    attachMessage(name, text) {
        this.setState(() => {
            return { [`message_${name}`]: <p className="form__message">{messages[text]}</p> };
        });
    }
    removeValidationHighlight(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            let target = event.target;
            target.classList.remove("contact-form__input-box_success");
            target.classList.remove("contact-form__input-box_fail");
        } else {
            return;
        }
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
            <section className="contact-form" aria-labelledby="contact-form-heading" aria-describedby="contact-form-desc">
                <h2 id="contact-form-heading" className="contact-form__heading">
                    Contact Us
                </h2>
                <p id="contact-form-desc">Feel free to contact us and we will get back to you as soon as we can.</p>

                <form onBlur={this.validateInput} onFocus={this.removeValidationHighlight} className="contact-form__form">
                    <div className="contact-form__input">
                        <label htmlFor="contact-form-firstName" className="contact-form__input-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="contact-form-firstName"
                            className="contact-form__input-box"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                        />
                    </div>
                    {this.state.message_firstName}
                    <div className="contact-form__input">
                        <label htmlFor="contact-form-lastName" className="contact-form__input-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="contact-form-lastName"
                            className="contact-form__input-box"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                        />
                    </div>
                    {this.state.message_lastName}
                    <div className="contact-form__input">
                        <label htmlFor="contact-form-email" className="contact-form__input-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="contact-form-email"
                            className="contact-form__input-box"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    {this.state.message_email}
                    <div className="contact-form__input">
                        <label htmlFor="contact-form-subject" className="contact-form__input-label">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="contact-form-subject"
                            className="contact-form__input-box"
                            onChange={this.handleChange}
                            value={this.state.subject}
                        />
                    </div>
                    {this.state.message_subject}
                    <div className="contact-form__input">
                        <label htmlFor="contact-form-textarea" className="contact-form__textarea-label">
                            Message Content
                        </label>
                        <textarea
                            name="msgContent"
                            id="contact-form-textarea"
                            className="contact-form__input-box"
                            cols="30"
                            rows="10"
                            onChange={this.handleChange}
                            value={this.state.msgContent}
                        ></textarea>
                    </div>
                    {this.state.message_msgContent}

                    <button onClick={this.submitForm} className="contact-form__button">
                        Send
                    </button>
                </form>
            </section>
        );
    }
}
