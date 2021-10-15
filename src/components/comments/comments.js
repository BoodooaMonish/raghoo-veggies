import React, { Component } from "react";
import Comments_card from "./comments_card";
import "./comments.css";

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.commentSwipe = null;
        this.tablist = React.createRef(null);
        this.handleComment = this.handleComment.bind(this);
        this.swipeComment = this.swipeComment.bind(this);
        this.stopSwipeComment = this.stopSwipeComment.bind(this);
        this.startSwipeComment = this.startSwipeComment.bind(this);
        this.state = {
            currentSlide: 1,
            maxSlide: 3,
        };
    }

    componentDidMount() {
        this.startSwipeComment();
    }

    componentWillUnmount() {
        clearInterval(this.commentSwipe);
    }

    swipeComment() {
        let currentComment = this.tablist.current.querySelector(`[data-slide="${this.state.currentSlide}"]`);
        currentComment.classList.remove("comments__tab_active");
        this.setState(() => {
            if (this.state.currentSlide === this.state.maxSlide) {
                return { currentSlide: 1 };
            } else {
                return { currentSlide: ++this.state.currentSlide };
            }
        });
        this.tablist.current.querySelector(`[data-slide="${this.state.currentSlide}"]`).classList.add("comments__tab_active");
    }

    stopSwipeComment(event) {
        if (event) {
            event.stopPropagation();
        }
        clearInterval(this.commentSwipe);
    }

    startSwipeComment(event) {
        if (event) {
            event.stopPropagation();
        }
        this.commentSwipe = setInterval(this.swipeComment, 5000);
    }

    handleComment(event) {
        event.stopPropagation();
        let target = event.target;
        let currrentActive = target.parentElement.querySelector(".comments__tab_active");
        if (!target.classList.contains("comments__tab")) return;
        this.setState(() => {
            let slideNo = Number(target.getAttribute("data-slide"));
            return { currentSlide: slideNo };
        });
        currrentActive.classList.remove("comments__tab_active");
        target.classList.add("comments__tab_active");
    }

    render() {
        return (
            <article
                onMouseOver={this.stopSwipeComment}
                onMouseOut={this.startSwipeComment}
                className="comments"
                role="group"
                aria-roledescription="carousel"
                aria-labelledby="comments-heading"
            >
                <h2 id="comments-heading" className="comments__heading">
                    Our Customers Testimonials
                </h2>

                <div
                    onFocus={this.stopSwipeComment}
                    ref={this.tablist}
                    onClick={this.handleComment}
                    className="comments__tablist"
                    role="tablist"
                    aria-label="slider buttons"
                >
                    <button className="comments__tab comments__tab_active" role="tab" aria-controls="comment-slide1" data-slide="1">
                        slide 1
                    </button>
                    <button className="comments__tab" role="tab" aria-controls="comment-slide2" data-slide="2">
                        slide 2
                    </button>
                    <button className="comments__tab" role="tab" aria-controls="comment-slide3" data-slide="3">
                        slide 3
                    </button>
                </div>
                <div className="comments__cards">
                    <Comments_card
                        slideNo={1}
                        currentSlide={this.state.currentSlide}
                        userName="J.Doe"
                        id="comment-slide1"
                        comment="Morbi non lacus pretium, tincidunt sem sed, finibus ante. Donec convallis, felis eget porta ultricies, augue justo dignissim
                        massa."
                    />

                    <Comments_card
                        slideNo={2}
                        currentSlide={this.state.currentSlide}
                        userName="S.Johnson"
                        id="comment-slide2"
                        comment="Vivamus metus est, venenatis sed felis vehicula, pellentesque feugiat erat. Morbi et elit orci. Vivamus suscipit velit in
                    pharetra semper."
                    />

                    <Comments_card
                        slideNo={3}
                        currentSlide={this.state.currentSlide}
                        userName="K.Roberson"
                        id="comment-slide3"
                        comment="Maecenas viverra eu magna et mollis. In pharetra auctor erat, id pretium magna commodo et. Cras in libero et velit mollis tiam elementum nibh ante"
                    />
                </div>
            </article>
        );
    }
}
