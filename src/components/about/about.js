// The "About" Component is rendered when the about page is loaded

import React, { Component } from "react";
import "./about.css";

export default class About extends Component {
    render() {
        return (
            <section className="about" aria-labelledby="about-heading">
                <h2 id="about-heading" className="about__heading">
                    About Us
                </h2>

                <div className="about__logo"></div>

                <p className="about__text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam quidem beatae iste eos maiores ad dolore ex sequi incidunt
                    laboriosam quibusdam magni hic, molestiae ullam doloribus debitis recusandae tempore nisi, eligendi quia? Tempore provident quis
                    commodi, aut magni corrupti possimus esse voluptatibus, vel cumque vitae, placeat rerum reiciendis officia dolor.
                </p>
            </section>
        );
    }
}
