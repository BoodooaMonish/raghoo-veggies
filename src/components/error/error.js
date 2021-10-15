import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./error.css";
import "../button/button.css";

export default class Error extends Component {
    render() {
        return (
            <section className="error">
                <p className="error__image">404 page error</p>
                <p className="error__text">Sorry, we couldn't find that page</p>
                <Link to="/" className="button button_secondary-color error__button">
                    Go Back To HomePage
                </Link>
            </section>
        );
    }
}
