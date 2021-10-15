import React, { Component } from "react";
import "./cart.css";
import "../button/button.css";
import { connect } from "react-redux";
import { updateStockQuantity } from "../../redux/veggies/veggiesActions";
import { Redirect } from "react-router-dom";

class CartCard extends Component {
    constructor(props) {
        super(props);
        this.removeCartItem = this.removeCartItem.bind(this);
        this.state = {
            redirect: false,
        };
    }
    removeCartItem(event) {
        event.preventDefault();
        let localStorage = JSON.parse(window.localStorage.getItem("raghoo-veggies-cart"));
        localStorage = localStorage.filter((item) => {
            return item.veggies_id !== this.props.veggies_id;
        });
        window.localStorage.setItem("raghoo-veggies-cart", JSON.stringify(localStorage));
        this.setState({
            redirect: true,
        });
        this.props.updateStockQuantity();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/cart" />;
        }
        return (
            <article className="cartList__shoppingCart__card">
                <img className="cartList__shoppingCart__card__image" src={`/veggies/${this.props.image}`} alt={this.props.name} />
                <h3 className="cartList__shoppingCart__card__name">{this.props.name}</h3>
                {+this.props.discount ? (
                    <>
                        <p className="cartList__shoppingCart__card__discount">
                            Rs. {(this.props.price - this.props.discount).toFixed(2)} per {this.props.unit}g
                        </p>
                        <p className="cartList__shoppingCart__card__price_cut">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                    </>
                ) : (
                    <>
                        <p className="cartList__shoppingCart__card__price">
                            Rs. {this.props.price} per {this.props.unit}g
                        </p>
                        <p className="cartList__shoppingCart__card__price_empty"></p>
                    </>
                )}
                <p className="cartList__shoppingCart__card__quantity">
                    <span className="cartList__shoppingCart__card__text_bold">Quantity:</span> {Number(this.props.unit) * Number(this.props.quantity)}
                    g
                </p>
                {+this.props.discount ? (
                    <p className="cartList__shoppingCart__card__total">
                        <span className="cartList__shoppingCart__card__text_bold">Total:</span> Rs.
                        {((Number(this.props.price) - Number(this.props.discount)) * Number(this.props.quantity)).toFixed(2)}
                    </p>
                ) : (
                    <p className="cartList__shoppingCart__card__total">
                        <span className="cartList__shoppingCart__card__text_bold">Total:</span> Rs.
                        {(Number(this.props.price) * Number(this.props.quantity)).toFixed(2)}
                    </p>
                )}
                <button className="button button_secondary-color cartList__shoppingCart__card_removeBtn" onClick={this.removeCartItem}>
                    Remove Item
                </button>
            </article>
        );
    }
}

const mapStateToProps = () => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStockQuantity: () => {
            dispatch(updateStockQuantity());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
