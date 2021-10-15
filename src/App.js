import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import AboutPage from "./pages/about";
import CartPage from "./pages/cart";
import ContactPage from "./pages/contact";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import VeggiesPage from "./pages/veggies";
import OneVeggies from "./pages/oneVeggies";
import NotFoundPage from "./pages/404";

import "./components/wrapper/wrapper.css";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="wrapper">
                    <div className="wrapper__nav">
                        <Navbar />
                    </div>
                    <main className="wrapper__main">
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/cart" component={CartPage} />
                            <Route path="/contact" component={ContactPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/veggies/error" component={NotFoundPage} />
                            <Route path="/veggies/:veggies_id" component={OneVeggies} />
                            <Route path="/veggies" component={VeggiesPage} />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </main>
                    <div className="wrapper__footer">
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

/* 

--> a div tag with a "wrapper" class wraps all components.
--> only the "navbar" and "footer" components are static across all pages

*/
