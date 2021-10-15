import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import "../button/button.css";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        //all key event bindings
        this.toggleClick = this.toggleClick.bind(this);
        this.outsideMenuClick = this.outsideMenuClick.bind(this);
        this.checkMenuKey = this.checkMenuKey.bind(this);
        //dom references
        this.menu = createRef(null);
        this.menuButton = createRef(null);
        //menu state
        this.state = {
            isMenuShown: false,
        };
    }

    //menu button event listener function
    toggleClick() {
        this.setState({ isMenuShown: !this.state.isMenuShown });
    }

    // Check ouside menu click
    outsideMenuClick(event) {
        if (event.target.className.search(/^navbar/) === -1) {
            this.setState({ isMenuShown: false });
        }
    }

    // Check keyboard interaction when menu is opened
    checkMenuKey(event) {
        event.stopPropagation();
        let target = event.target;
        switch (event.key) {
            case "Escape":
                this.setState({ isMenuShown: false });
                break;
            case "ArrowDown":
                if (target.nextElementSibling !== null) {
                    target.nextElementSibling.focus();
                } else {
                    this.menu.current.firstElementChild.focus();
                }
                break;
            case "ArrowUp":
                if (target.previousElementSibling !== null) {
                    target.previousElementSibling.focus();
                } else {
                    this.menu.current.lastElementChild.focus();
                }
                break;
            case "Tab":
                event.preventDefault();
                this.setState({ isMenuShown: false });
            default:
                break;
        }
    }

    componentDidUpdate() {
        if (this.state.isMenuShown) {
            this.menu.current.firstElementChild.focus();
            window.addEventListener("click", this.outsideMenuClick);
            this.menu.current.addEventListener("keydown", this.checkMenuKey);
        } else if (this.state.isMenuShown === false) {
            this.menuButton.current.focus();
            window.removeEventListener("click", this.outsideMenuClick);
            this.menu.current.removeEventListener("keydown", this.checkMenuKey);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.outsideMenuClick);
        this.menu.current.removeEventListener("keydown", this.checkMenuKey);
    }

    render() {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar__brand">
                    Raghoo's Veggies Home Page
                </Link>
                <div ref={this.menu} className={this.state.isMenuShown ? "navbar__menu" : "navbar__menu navbar__menu_hidden"} id="main__navigation">
                    <Link to="/" className="navbar__link">
                        Home
                    </Link>
                    <Link to="/veggies" className="navbar__link">
                        Veggies
                    </Link>
                    <Link to="/about" className="navbar__link">
                        About Us
                    </Link>
                    <Link to="/contact" className="navbar__link">
                        Contact Us
                    </Link>
                    <Link to="/register" className="navbar__link navbar__link_register">
                        Register Now!
                    </Link>
                </div>
                <div className="navbar__side-menu">
                    <Link to="/cart" className="navbar__cart" title="Shopping Cart">
                        Cart
                    </Link>
                    <Link to="/login" className="button button_primary-color navbar__login-button">
                        Login
                    </Link>
                    <button
                        ref={this.menuButton}
                        onClick={this.toggleClick}
                        className="navbar__toggler"
                        aria-expanded={this.state.isMenuShown ? "true" : "false"}
                        aria-controls="main__navigation"
                    >
                        <span className="navbar__toggler-icon" aria-hidden="true">
                            ToggleMenu
                        </span>
                    </button>
                </div>
            </nav>
        );
    }
}
