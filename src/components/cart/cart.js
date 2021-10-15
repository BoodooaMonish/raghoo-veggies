import React, { Component } from "react";
import CartCard from "./cart-card";
import { Link } from "react-router-dom";
import "./cart.css";
import "../button/button.css";
import { connect } from "react-redux";
import { fetchVeggies, updateStockQuantity } from "../../redux/veggies/veggiesActions";
import Loading from "../loading/loading";
import Error2 from "../error2/error2";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.handleCards = this.handleCards.bind(this);
        this.state = {
            islocalStorage: false,
        };
    }
    componentDidMount() {
        // when the component is mounted, it checks if the redux store contains the veggies information
        // if not, it will dispatch an action to fetch the veggies from a database
        if (this.props.isVeggiesLength === 0) {
            this.props.fetchVeggies();
        }
        // if localStorage is available and contain veggies, set state "islocalStorage" to true
        const localStorage = JSON.parse(window.localStorage.getItem("raghoo-veggies-cart"));
        if (localStorage && localStorage.length) {
            this.setState({
                islocalStorage: true,
            });
        }
    }
    handleCards(event) {
        // if all item are removed from the cart set state "islocalStorage" to false which will result in the empty cart component being rendered
        event.stopPropagation();
        if (event.target.classList.contains("cartList__shoppingCart__card_removeBtn") && event.currentTarget.children.length === 1) {
            this.setState(() => {
                return {
                    islocalStorage: false,
                };
            });
        }
    }
    render() {
        // using the information from the redux store, if "loading" is true, load the loading component
        // if "error" has a string of information, render it using the "error" component
        // else iterate veggies in cart and render them with the "cart-card" component
        return (
            <>
                {this.props.loading ? (
                    <Loading />
                ) : this.props.error ? (
                    <Error2 errorMsg={this.props.error} />
                ) : this.state.islocalStorage ? (
                    <div className="cartList">
                        <section className="cartList__shoppingCart">
                            <h2 className="cartList__shoppingCart__heading">Shopping Cart</h2>
                            <div className="cartList__shoppingCart__cards" onClick={this.handleCards}>
                                {this.props.cart.map((item) => {
                                    return (
                                        <CartCard
                                            key={item.id}
                                            veggies_id={item.id}
                                            image={item.image}
                                            name={item.name}
                                            price={item.standard_price}
                                            stock={item.stock}
                                            unit={item.unit_in_g}
                                            discount={item.discount}
                                            quantity={item.quantity}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                        <section className="cartList__shippingAddr">
                            <h2 className="cartList__shippingAddr__heading">Shipping Address</h2>
                            <p className="cartList__shippingAddr__loginMsg">
                                Please <Link to="/login">login</Link> to access your shipping address.
                            </p>
                        </section>
                        <section className="cartList__billingAddr">
                            <h2 className="cartList__billingAddr__heading">Billing Address</h2>
                            <p className="cartList__billingAddr__loginMsg">
                                Please <Link to="/login">login</Link> to access your billing address.
                            </p>
                        </section>
                        <section className="cartList__paymentDetails">
                            <h2 className="cartList__paymentDetails__heading">Payment Details</h2>
                            <p className="cartList__paymentDetails__text">Payment Method: Cash/ Credit Card on Delivery</p>
                            <div className="cartList__paymentDetails__buttons">
                                <Link className="button button_tertiary-color cartList__paymentDetails__continue-button" to="/veggies">
                                    Continue Shopping
                                </Link>
                                <button className="button button_primary-color cartList__paymentDetails__checkout-button">Check Out</button>
                            </div>
                        </section>
                    </div>
                ) : (
                    <section className="cart">
                        <div className="cart__image"></div>
                        <p className="cart__text">Ohhh... Your cart is empty</p>
                        <p className="cart__text_fade">but it does not have to be.</p>
                        <Link to="/veggies" className="button button_secondary-color cart__button">
                            Shop Now
                        </Link>
                    </section>
                )}
            </>
        );
    }
}

/* as the quantity value of veggies is updated whenever the veggies are fetched or added to cart,
only veggies with a true value in the quantity is selected using the array.filter method
*/
const mapStateToProps = (state) => {
    const filterVeggies = (veggies) => {
        let filteredVeggies = veggies;
        filteredVeggies = filteredVeggies.filter((item) => {
            return Number(item.quantity) !== 0;
        });
        return filteredVeggies;
    };
    return {
        cart: filterVeggies(state.veggies.data),
        loading: state.veggies.loading,
        error: state.veggies.error,
        isVeggiesLength: state.veggies.data.length,
    };
};

// the "fetchVeggies" and "updateStockQuantity" actions are added to the "cart" component props
const mapDispatchToProps = (dispatch) => {
    return {
        fetchVeggies: () => {
            dispatch(fetchVeggies());
        },
        updateStockQuantity: () => {
            dispatch(updateStockQuantity());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
