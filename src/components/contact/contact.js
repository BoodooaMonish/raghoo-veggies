import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import "../button/button.css";

export default class Contact extends Component {
    render() {
        return (
            <article className="contact" aria-labelledby="contact-heading">
                <h1 id="contact-heading" className="contact__heading">
                    Need Help! Get In Touch
                </h1>
                <div className="contact__img-container">
                    <div className="contact__image"></div>
                </div>
                <div className="contact__text-container">
                    <p className="contact__text">
                        Suspendisse mi enim, imperdiet id molestie vitae, eleifend elementum est. Vestibulum scelerisque augue eu urna hendrerit
                        pellentesque. Vivamus ut mollis ipsum.
                    </p>
                    <Link to="/contact" className="button button_secondary-color contact__button">
                        Contact Us
                    </Link>
                </div>
            </article>
        );
    }
}
