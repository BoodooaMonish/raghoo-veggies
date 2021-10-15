import React, { Component } from "react";
import "./loading.css";

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="loading__spinner" aria-hidden="true"></div>
                <p className="loading__text">Loading...</p>
            </div>
        );
    }
}
