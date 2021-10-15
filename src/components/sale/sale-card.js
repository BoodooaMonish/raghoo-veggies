import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sale.css";
import "../button/button.css";

export default class SaleCard extends Component {
    constructor(props) {
        super(props);
        this.sale = React.createRef(null);
        this.removeNextSaleClass = this.removeNextSaleClass.bind(this);
        this.removePreviousSaleClass = this.removePreviousSaleClass.bind(this);
        this.removeHiddenSaleClass = this.removeHiddenSaleClass.bind(this);
    }
    componentDidMount() {
        switch (this.props.saleNo) {
            case this.props.currentCount:
                this.sale.current.className = "sale__card sale__card_active";
                this.sale.current.setAttribute("aria-hidden", "false");
                break;
            case this.props.currentCount + 1:
                this.sale.current.className = "sale__card sale__card_next";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            case this.props.currentCount - 1:
                this.sale.current.className = "sale__card sale__card_previous";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            default:
                break;
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentCount === this.props.maxCount && this.props.currentCount === 1) {
            this.moveToNextSale();
        } else if (prevProps.currentCount === 1 && this.props.currentCount === this.props.maxCount) {
            this.moveToPreviousSale();
        } else if (prevProps.currentCount < this.props.currentCount) {
            this.moveToNextSale();
        } else if (prevProps.currentCount > this.props.currentCount) {
            this.moveToPreviousSale();
        }
    }

    moveToNextSale() {
        switch (this.props.saleNo) {
            case this.props.currentCount:
                this.sale.current.addEventListener("transitionend", this.removeNextSaleClass);
                this.sale.current.classList.add("sale__card_active");
                this.sale.current.setAttribute("aria-hidden", "false");
                break;
            case this.props.previousCount:
                this.sale.current.className = "sale__card sale__card_previous";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            case this.props.nextCount:
                this.sale.current.addEventListener("transitionend", this.removeHiddenSaleClass);
                this.sale.current.classList.add("sale__card_next");
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            default:
                this.sale.current.className = "sale__card sale__card_hidden";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
        }
    }

    moveToPreviousSale() {
        switch (this.props.saleNo) {
            case this.props.currentCount:
                this.sale.current.addEventListener("transitionend", this.removePreviousSaleClass);
                this.sale.current.classList.add("sale__card_active");
                this.sale.current.setAttribute("aria-hidden", "false");
                break;
            case this.props.previousCount:
                this.sale.current.className = "sale__card sale__card_previous";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            case this.props.nextCount:
                this.sale.current.className = "sale__card sale__card_next";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
            default:
                this.sale.current.className = "sale__card sale__card_hidden";
                this.sale.current.setAttribute("aria-hidden", "true");
                break;
        }
    }

    removeNextSaleClass(event) {
        event.target.classList.remove("sale__card_next");
        event.target.removeEventListener("transitionend", this.removeNextSaleClass);
    }
    removeHiddenSaleClass(event) {
        event.target.classList.remove("sale__card_hidden");
        event.target.removeEventListener("transitionend", this.removeHiddenSaleClass);
    }

    removePreviousSaleClass(event) {
        event.target.classList.remove("sale__card_previous");
        event.target.removeEventListener("transitionend", this.removePreviousSaleClass);
    }

    render() {
        return (
            <section ref={this.sale} className="sale__card sale__card_hidden" aria-label={this.props.name} aria-hidden="true">
                <div className="sale__content">
                    <img className="sale__image" src={`./veggies/${this.props.image}`} alt={this.props.name} />
                    <p className="sale__text">{this.props.name}</p>
                    <p className="sale__discount">
                        Rs {(this.props.price - this.props.discount).toFixed(2)} per {this.props.unit}g
                    </p>
                    <p className="sale__price">
                        Rs {this.props.price} per {this.props.unit}g
                    </p>
                    {(Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit) > 1000 ? (
                        <p className="sale__stock">
                            {(((Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)) / 1000).toFixed(2)}kg left
                        </p>
                    ) : (
                        <p className="sale__stock">{(Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)}g left</p>
                    )}

                    <Link to={"/veggies/" + this.props.veggies_id} className="button button_secondary-color sale__button">
                        View More
                    </Link>
                </div>
            </section>
        );
    }
}
