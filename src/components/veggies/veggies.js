import React, { Component } from "react";
import Veggies_card from "./veggies_card";
import Loading from "../loading/loading";
import Error2 from "../error2/error2";
import "./veggies.css";
import { connect } from "react-redux";
import { fetchVeggies } from "../../redux/veggies/veggiesActions";

class Veggies extends Component {
    componentDidMount() {
        // when the component is mounted, it checks if the redux store contains the veggies information
        // if not, it will dispatch an action to fetch the veggies from a database
        if (this.props.veggies.data.length === 0) {
            this.props.fetchVeggies();
        }
    }
    render() {
        // using the information from the redux store, if "loading" is true, load the loading component
        // if "error" has a string of information, render it using the "error" component
        // else iterate all veggies using array.map and render each veggies using the "veggies_card" component
        return (
            <section className="veggies" aria-labelledby="veggies-heading">
                <h2 id="veggies-heading" className="veggies__heading">
                    Browse Veggies
                </h2>
                <section className="veggies__items" aria-label="list of all veggies available">
                    {this.props.veggies.loading ? (
                        <Loading />
                    ) : this.props.veggies.error ? (
                        <Error2 errorMsg={this.props.veggies.error} />
                    ) : (
                        this.props.veggies.data.map((item) => {
                            return (
                                <Veggies_card
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
                        })
                    )}
                </section>
            </section>
        );
    }
}

// the full redux store is used as props for the "veggies" component
const mapStateToProps = (state) => {
    return {
        veggies: state.veggies,
    };
};

// the "fetchVeggies" action is added to the "veggies" component props
const mapDispatchToProps = (dispatch) => {
    return {
        fetchVeggies: () => {
            dispatch(fetchVeggies());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Veggies);
