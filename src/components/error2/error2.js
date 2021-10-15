import React, { Component } from "react";
import "./error2.css";

export default class Error2 extends Component {
    render() {
        return (
            <div className="error2">
                <span className="error2__big-text" aria-hidden="true">
                    Ooops!
                </span>
                <p className="error2__text">{this.props.errorMsg}. Sorry about that.</p>
            </div>
        );
    }
}
