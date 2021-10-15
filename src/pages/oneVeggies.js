import React, { Component } from "react";
import SingleVeggies from "../components/singleVeggies/singleVeggies";

export default class OneVeggies extends Component {
    render() {
        return <SingleVeggies veggies_id={this.props.match.params.veggies_id} />;
    }
}

// The page is a dynamically generated page which render one veggies depending on the "veggies_id" props
