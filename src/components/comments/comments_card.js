import React, { Component } from "react";
import "./comments.css";

export default class Comments_card extends Component {
    constructor(props) {
        super(props);
        this.slide = React.createRef(null);
        // this.endTransition = this.endTransition.bind(this);
    }
    componentDidMount() {
        if (this.props.slideNo === this.props.currentSlide) {
            this.slide.current.className = "comments__card comments__card_activeLeft";
            this.slide.current.setAttribute("aria-selected", "true");
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentSlide === this.props.currentSlide) {
            return;
        }
        if (prevProps.currentSlide > this.props.currentSlide) {
            if (this.props.slideNo === this.props.currentSlide) {
                this.slide.current.setAttribute("aria-selected", "true");
                this.slide.current.className = "comments__card comments__card_activeRight";
            } else {
                this.slide.current.className = "comments__card comments__card_hidden";
                this.slide.current.setAttribute("aria-selected", "false");
            }
        }
        if (prevProps.currentSlide < this.props.currentSlide) {
            if (this.props.slideNo === this.props.currentSlide) {
                this.slide.current.setAttribute("aria-selected", "true");
                this.slide.current.className = "comments__card comments__card_activeLeft";
            } else {
                this.slide.current.className = "comments__card comments__card_hidden";
                this.slide.current.setAttribute("aria-selected", "false");
            }
        }
    }

    render() {
        return (
            <section
                ref={this.slide}
                className="comments__card comments__card_hidden"
                aria-label={`${this.props.userName} Comments`}
                role="tabpanel"
                aria-roledescription="slide"
                aria-selected="false"
                id={this.props.id}
            >
                <div className="comments__profile-pic"></div>
                <blockquote className="comments__text">
                    {this.props.comment}
                    <cite className="comments__username">{this.props.userName}</cite>
                </blockquote>
            </section>
        );
    }
}
