import React, { Component } from "react";
import "./faqs.css";

export default class FaqsCard extends Component {
    render() {
        return (
            <section className="faqs__card" aria-label={this.props.label}>
                <div className={`faqs__image ${this.props.imgSvg}`}></div>
                <p className="faqs__text">{this.props.textContent}</p>
            </section>
        );
    }
}
