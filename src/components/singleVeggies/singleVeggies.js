import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../loading/loading";
import Error2 from "../error2/error2";
import SingleVeggiesCard from "./singleVeggies-card";
import "./singleVeggies.css";
import "../button/button.css";
import { connect } from "react-redux";
import { fetchVeggies, updateStockQuantity } from "../../redux/veggies/veggiesActions";

class SingleVeggies extends Component {
    constructor(props) {
        super(props);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.addItem = this.addItem.bind(this);
        this.state = {
            quantity: 1,
            redirect: false,
        };
    }
    componentDidMount() {
        // when the component is mounted, it checks if the redux store contains the veggies information
        // if not, it will dispatch an action to fetch the veggies from a database
        if (this.props.veggiesLength === 0) {
            this.props.fetchVeggies();
        }
    }
    incrementQuantity(event) {
        //updates the state when the quantity is incremented
        //also checks if the quantity is has reached its maximum in stock
        event.preventDefault();
        if (this.state.quantity + 1 > Number(this.props.data.stock)) {
            this.setState(() => {
                return {
                    quantity: Number(this.props.data.stock),
                    redirect: false,
                };
            });
        } else {
            this.setState(() => {
                return {
                    quantity: ++this.state.quantity,
                };
            });
        }
    }
    decrementQuantity(event) {
        //updates the state when the quantity is decremented
        //also checks if the quantity is at least 1
        event.preventDefault();
        if (this.state.quantity - 1 < 1) {
            this.setState(() => {
                return {
                    quantity: 1,
                };
            });
        } else {
            this.setState(() => {
                return {
                    quantity: --this.state.quantity,
                };
            });
        }
    }
    changeQuantity(event) {
        event.preventDefault();
        return false;
    }
    addItem(event) {
        //adds the veggies to localStorage and updates the redux store
        event.preventDefault();
        if (Number(this.state.quantity) && this.state.quantity >= 1 && this.state.quantity <= Number(this.props.data.stock)) {
            if (!window.localStorage.getItem("raghoo-veggies-cart")) {
                window.localStorage.setItem(
                    "raghoo-veggies-cart",
                    JSON.stringify([{ veggies_id: this.props.data.id, quantity: this.state.quantity }])
                );
                this.props.updateStockQuantity();
                this.setState({
                    redirect: true,
                });
            } else {
                let localCart = JSON.parse(window.localStorage.getItem("raghoo-veggies-cart"));
                let currentItem = localCart.find((item) => {
                    return item.veggies_id === this.props.data.id;
                });
                if (currentItem) {
                    localCart.forEach((item) => {
                        if (item.veggies_id === this.props.data.id) {
                            item.quantity = Number(item.quantity) + Number(this.state.quantity);
                        }
                    });
                } else {
                    localCart.push({ veggies_id: this.props.data.id, quantity: this.state.quantity });
                }
                window.localStorage.setItem("raghoo-veggies-cart", JSON.stringify(localCart));
                this.props.updateStockQuantity();
                this.setState({
                    redirect: true,
                });
            }
        } else {
            console.log("Error in adding item to cart!");
        }
        return this.setState({ redirect: true });
    }
    render() {
        //the redirect is used to re-render the page when the redux store is updated
        if (this.state.redirect) {
            return <Redirect to="/veggies" />;
        }
        return (
            // using the information from the redux store, if "loading" is true, load the loading component
            // if "error" has a string of information, render it using the "error" component
            // else the veggies using the data from the redux store
            // if the veggies data-->discount, display the discount price else dislay the normal price
            // when the component is rendered, the data-->quantity is substracted from the stock availibility if the veggies is in localstorage
            <>
                {this.props.singleVeggiesLoading ? (
                    <Loading />
                ) : this.props.singleVeggiesError ? (
                    <Error2 errorMsg={this.props.singleVeggiesError} />
                ) : this.props.data ? (
                    <>
                        <section className="singleVeggies">
                            <div className="singleVeggies__imageContainer">
                                <img className="singleVeggies__image" src={`/veggies/${this.props.data.image}`} alt={this.props.data.name} />
                            </div>
                            <div className="singleVeggies__form">
                                <h3 className="singleVeggies__name">{this.props.data.name}</h3>
                                {+this.props.data.discount ? (
                                    <div className="singleVeggies__priceContainer">
                                        <p className="singleVeggies__price_cut">Rs. {this.props.data.standard_price}</p>
                                        <p className="singleVeggies__discount">
                                            Rs. {(this.props.data.standard_price - this.props.data.discount).toFixed(2)} per{" "}
                                            {this.props.data.unit_in_g}g
                                        </p>
                                    </div>
                                ) : (
                                    <p className="singleVeggies__price">
                                        Rs. {this.props.data.standard_price} per {this.props.data.unit_in_g}g
                                    </p>
                                )}
                                <p className="singleVeggies__stock">
                                    {Number(this.props.data.unit_in_g) * (Number(this.props.data.stock) - Number(this.props.data.quantity))}g left
                                </p>
                                {!(this.props.data.stock <= this.props.data.quantity) ? (
                                    <form className="singleVeggies__quantityContainer">
                                        <div className="singleVeggies__quantity">
                                            {this.state.quantity > 1 ? (
                                                <button
                                                    className="singleVeggies__quantity_button singleVeggies__quantity_button_decrement"
                                                    onClick={this.decrementQuantity}
                                                >
                                                    Decrease
                                                </button>
                                            ) : (
                                                <button
                                                    className="singleVeggies__quantity_button singleVeggies__quantity_button_none"
                                                    onClick={this.decrementQuantity}
                                                    aria-hidden="true"
                                                ></button>
                                            )}

                                            <input
                                                className="singleVeggies__quantity_input"
                                                type="text"
                                                aria-valuenow={this.state.quantity * Number(this.props.data.unit_in_g)}
                                                aria-valuemin={this.props.data.unit_in_g}
                                                aria-valuemax={
                                                    Number(this.props.data.unit_in_g) *
                                                    (Number(this.props.data.stock) - Number(this.props.data.quantity))
                                                }
                                                aria-label="quantity"
                                                value={this.state.quantity * Number(this.props.data.unit_in_g)}
                                                onChange={this.changeQuantity}
                                            />
                                            <span className="singleVeggies__quantity_gram">g</span>
                                            {this.state.quantity < Number(this.props.data.stock) - Number(this.props.data.quantity) ? (
                                                <button
                                                    className="singleVeggies__quantity_button singleVeggies__quantity_button_increment"
                                                    onClick={this.incrementQuantity}
                                                >
                                                    Increase
                                                </button>
                                            ) : (
                                                <button
                                                    className="singleVeggies__quantity_button singleVeggies__quantity_button_none"
                                                    onClick={this.incrementQuantity}
                                                    aria-hidden="true"
                                                ></button>
                                            )}
                                        </div>
                                        <button className="button button_secondary-color singleVeggies__button" onClick={this.addItem}>
                                            Add to Cart
                                        </button>
                                    </form>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </section>
                        <aside className="singleVeggies__othersContainer">
                            <h3 className="singleVeggies__others-heading">Customers who viewed this item also viewed</h3>
                            <div className="singleVeggies__others-cards">
                                {this.props.rand.map((item) => {
                                    return (
                                        <SingleVeggiesCard
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
                        </aside>
                    </>
                ) : this.props.rand[0] && this.props.data === undefined ? (
                    <Redirect to="/veggies/error" />
                ) : (
                    <></>
                )}
            </>
        );
    }
}
// using the props from the react router, the "veggies_id" is used to retrieve information about the particular veggies
// a random set of 4 veggies is choosen and rendered when the "singleVeggies" component is loaded
const mapStateToProps = (state, ownProps) => {
    const singleVeggies = state.veggies.data.find((item) => {
        return item.id === ownProps.veggies_id;
    });
    const createRandVeggies = () => {
        let arrVeggies = state.veggies.data.filter((item) => {
            return item.id !== ownProps.veggies_id;
        });
        let arrFinal = [];
        let i = 0;
        while (i < 4) {
            let selectedVeggies = arrVeggies[Number(Math.floor(Math.random() * arrVeggies.length))];
            arrFinal.push(selectedVeggies);
            arrVeggies = arrVeggies.filter((item) => {
                return item.id !== selectedVeggies.id;
            });
            i++;
        }
        return arrFinal;
    };
    return {
        data: singleVeggies,
        rand: createRandVeggies(),
        singleVeggiesLoading: state.veggies.loading,
        singleVeggiesError: state.veggies.error,
        veggiesLength: state.veggies.data.length,
    };
};

// the "fetchVeggies" and "updateStockQuantity" actions are added to the "singleVeggies" component props
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleVeggies);
