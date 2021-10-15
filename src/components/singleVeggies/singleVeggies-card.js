import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../button/button.css";
import "./singleVeggies-card.css";

export default class SingleVeggiesCard extends Component {
    render() {
        // if props-->discount is none, display normal price else display discounted price
        // when the component is rendered, the props-->quantity is substracted from the stock availibility if the veggies is in localstorage
        return (
            <article className="singleVeggiesCard__item">
                <img className="singleVeggiesCard__image" src={`/veggies/${this.props.image}`} alt={this.props.name} />
                <p className="singleVeggiesCard__name">{this.props.name}</p>
                {+this.props.discount ? (
                    <>
                        <p className="singleVeggiesCard__discount">
                            Rs. {(this.props.price - this.props.discount).toFixed(2)} per {this.props.unit}g
                        </p>
                        <p className="singleVeggiesCard__price_cut">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                    </>
                ) : (
                    <>
                        <p className="singleVeggiesCard__price">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                        <p className="singleVeggiesCard__price_empty"></p>
                    </>
                )}
                {Number(this.props.stock) * Number(this.props.unit) > 1000 ? (
                    <p className="singleVeggiesCard__stock">
                        {(((Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)) / 1000).toFixed(2)}kg left
                    </p>
                ) : (
                    <p className="singleVeggiesCard__stock">
                        {(Number(this.props.stock) - Number(this.props.quantity)) * Number(this.props.unit)}g left
                    </p>
                )}
                <Link to={"/veggies/" + this.props.veggies_id} className="button button_secondary-color singleVeggiesCard__button">
                    Show More
                </Link>
            </article>
        );
    }
}
