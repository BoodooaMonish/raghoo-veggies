import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./veggies.css";
import "../button/button.css";

export default class Veggies_card extends Component {
    render() {
        // if props-->discount is none, display normal price else display discounted price
        // when the component is rendered, the props-->quantity is substracted from the stock availibility if the veggies is in localstorage
        return (
            <article className="veggies__item">
                <img className="veggies__image" src={`/veggies/${this.props.image}`} alt={this.props.name} />
                <p className="veggies__name">{this.props.name}</p>
                {+this.props.discount ? (
                    <>
                        <p className="veggies__discount">
                            Rs. {(this.props.price - this.props.discount).toFixed(2)} per {this.props.unit}g
                        </p>
                        <p className="veggies__price_cut">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                    </>
                ) : (
                    <>
                        <p className="veggies__price">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                        <p className="veggies__price_empty"></p>
                    </>
                )}
                {Number(this.props.stock) * Number(this.props.unit) > 1000 ? (
                    <p className="veggies__stock">
                        {(((Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)) / 1000).toFixed(2)}kg left
                    </p>
                ) : (
                    <p className="veggies__stock">{(Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)}g left</p>
                )}
                <Link to={"/veggies/" + this.props.veggies_id} className="button button_secondary-color veggies__button">
                    Show More
                </Link>
            </article>
        );
    }
}
