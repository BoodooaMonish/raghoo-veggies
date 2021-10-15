import React, { Component } from "react";
import Hero from "../components/hero/hero";
import Faqs from "../components/faqs/faqs";
import Sale from "../components/sale/sale";
import Comments from "../components/comments/comments";
import Contact from "../components/contact/contact";

export default class HomePage extends Component {
    render() {
        return (
            <>
                <Hero />
                <Faqs />
                <Sale />
                <Comments />
                <Contact />
            </>
        );
    }
}
