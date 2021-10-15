import React, { Component } from "react";
import FaqsCard from "./faqs-card";
import "./faqs.css";

export default class Hero extends Component {
    render() {
        return (
            <article className="faqs" aria-labelledby="faqs-heading">
                <h2 id="faqs-heading" className="faqs__heading">
                    How It Works
                </h2>
                <div className="faqs__cards">
                    <FaqsCard
                        label="Step 1 Browse the veggies"
                        imgSvg="faqs__image_cart"
                        textContent="1. Browse this veggies and finalize the order in the cart"
                    />
                    <FaqsCard
                        label="Step 2 Process the order for delivery"
                        imgSvg="faqs__image_truck"
                        textContent="2. Your order will be immediately be processed and delivered to you"
                    />
                    <FaqsCard
                        label="Step 3 Pay on delivery"
                        imgSvg="faqs__image_wallet"
                        textContent="3. Pickup your veggies at your door and pay on the spot"
                    />
                </div>
            </article>
        );
    }
}
