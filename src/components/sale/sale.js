import React, { Component } from "react";
import SaleCard from "./sale-card";
import Loading from "../loading/loading";
import Error2 from "../error2/error2";
import "./sale.css";
import { connect } from "react-redux";
import { fetchVeggies } from "../../redux/veggies/veggiesActions";

class Sale extends Component {
    constructor(props) {
        super(props);
        this.previousSale = this.previousSale.bind(this);
        this.nextSale = this.nextSale.bind(this);
        // all "count" variables types determines the location of each sale card
        // saleCount determines which sale card is visible and interactive
        // nextCount and previousCount determines which sale card is faded
        // saleCount is compared with saleCard's saleNo after render to determine which sale card should be shown
        this.state = {
            saleCount: 2,
            maxCount: 4,
            nextCount: 3,
            previousCount: 1,
        };
    }

    componentDidMount() {
        // when the component is mounted, it checks if the redux store contains the veggies information
        // if not, it will dispatch an action to fetch the veggies from a database
        if (this.props.sale.length === 0) {
            this.props.fetchVeggies();
        }
    }

    previousSale(event) {
        //decreases the saleCount in the state
        event.stopPropagation();
        this.setState(() => {
            let current;
            let next;
            let previous;
            if (this.state.saleCount <= 1) {
                current = this.state.maxCount;
            } else {
                current = --this.state.saleCount;
            }
            if (this.state.nextCount <= 1) {
                next = this.state.maxCount;
            } else {
                next = --this.state.nextCount;
            }
            if (this.state.previousCount <= 1) {
                previous = this.state.maxCount;
            } else {
                previous = --this.state.previousCount;
            }
            return { saleCount: current, nextCount: next, previousCount: previous };
        });
    }

    nextSale(event) {
        //increases the sale count in the state
        event.stopPropagation();
        this.setState(() => {
            let current;
            let next;
            let previous;
            if (this.state.saleCount >= this.state.maxCount) {
                current = 1;
            } else {
                current = ++this.state.saleCount;
            }
            if (this.state.nextCount >= this.state.maxCount) {
                next = 1;
            } else {
                next = ++this.state.nextCount;
            }
            if (this.state.previousCount >= this.state.maxCount) {
                previous = 1;
            } else {
                previous = ++this.state.previousCount;
            }
            return { saleCount: current, nextCount: next, previousCount: previous };
        });
    }

    render() {
        return (
            <article className="sale" aria-labelledby="sale-heading">
                <h2 id="sale-heading" className="sale__heading">
                    Special Veggies Deals
                </h2>
                <div id="sale-cards" className="sale__cards">
                    {this.props.saleLoading ? (
                        <Loading />
                    ) : this.props.saleError ? (
                        <Error2 errorMsg={this.props.saleError} />
                    ) : (
                        this.props.sale.map((item) => {
                            return (
                                <SaleCard
                                    key={item.id}
                                    veggies_id={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.standard_price}
                                    stock={item.stock}
                                    unit={item.unit_in_g}
                                    discount={item.discount}
                                    quantity={item.quantity}
                                    saleNo={item.saleNo}
                                    currentCount={this.state.saleCount}
                                    nextCount={this.state.nextCount}
                                    previousCount={this.state.previousCount}
                                    maxCount={this.state.maxCount}
                                />
                            );
                        })
                    )}
                </div>
                {this.props.saleLoading === false || this.props.saleError === false ? (
                    <>
                        <button onClick={this.previousSale} className="sale__previous">
                            previous sale item
                            <span className="sale__icon_previous">prev</span>
                        </button>
                        <button onClick={this.nextSale} className="sale__next">
                            next sale item
                            <span className="sale__icon_next">next</span>
                        </button>
                    </>
                ) : (
                    ""
                )}
            </article>
        );
    }
}

// filters the redux store to find the top 4 most discounted veggies
// each veggies is given a count value "1 to 4"
const mapStateToProps = (state) => {
    let sortVeggies = state.veggies.data.filter((item) => {
        return +item["discount"] > 0;
    });
    sortVeggies.sort((a, b) => {
        return Number(b.discount) - Number(a.discount);
    });
    sortVeggies = sortVeggies.slice(0, 4);
    if (sortVeggies.length !== 0) {
        for (let count = 0; count < 4; count++) {
            sortVeggies[count]["saleNo"] = count + 1;
        }
    }
    return {
        sale: sortVeggies,
        saleLoading: state.veggies.loading,
        saleError: state.veggies.error,
    };
};

// the "fetchVeggies" action is added to the "sale" component props
const mapDispatchToProps = (dispatch) => {
    return {
        fetchVeggies: () => {
            dispatch(fetchVeggies());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sale);
