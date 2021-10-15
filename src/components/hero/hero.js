import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hero.css";
import "../button/button.css";

export default class Hero extends Component {
    render() {
        return (
            <article className="hero" aria-labelledby="hero-heading">
                <h1 id="hero-heading" className="hero__heading">
                    Veggies Delivered To Your Door
                </h1>
                <div className="hero__image"></div>
                <p className="hero__text">
                    Vivamus vulputate, nulla at pulvinar semper, mauris magna imperdiet dui, vel ultricies mauris erat non mi. Sed dapibus, dolor ac
                    ultrices dapibus, tortor mi faucibus lectus, non rutrum elit leo ac lorem. Aliquam lectus augue, laoreet quis dui eget, tristique
                    pulvinar eros.
                </p>
                <Link to="veggies" className="button button_secondary-color hero__button">
                    Browse Veggies
                </Link>
            </article>
        );
    }
}
