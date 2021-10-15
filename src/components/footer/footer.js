import React, { Component } from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <address className="footer__company-info" aria-label="Company Personal Information">
                    <span className="footer__company-logo"></span>
                    <br />
                    <h3 className="footer__company-name">Raghoo Veggies</h3>
                    <span className="footer__company_symbol footer__company-location"></span>myfarm, mycity, lorem ipsum
                    <br />
                    <span className="footer__company_symbol footer__company-email"></span>raghoo@yahoo.com
                    <br />
                    <span className="footer__company_symbol footer__company-telephone"></span>230-999-NUM
                </address>
                <nav className="footer__navigation" aria-label="quick menu links">
                    <div className="footer__quick-links">
                        <h3 className="footer__quick-links-heading">Quick Links</h3>
                        <Link to="/about" className="footer__nav-links">
                            About Us
                        </Link>
                        <Link to="/contact" className="footer__nav-links">
                            Contact Us
                        </Link>
                        <Link to="/veggies" className="footer__nav-links">
                            All Veggies
                        </Link>
                    </div>
                </nav>
                <div className="footer__social-links">
                    <h3 className="footer__social-links-heading">Follow Us</h3>
                    <a href="#" className="footer__social-image footer_social-facebook" title="facebook">
                        facebook
                    </a>
                    <a href="#" className="footer__social-image footer_social-linkedin" title="linkedIn">
                        linkedIn
                    </a>
                    <a href="#" className="footer__social-image footer_social-twitter" title="twitter">
                        twitter
                    </a>
                </div>
                <section className="footer__copyright">&copy; {new Date().getFullYear()} Boodooa Monish. All Rights Reserved</section>
            </footer>
        );
    }
}
