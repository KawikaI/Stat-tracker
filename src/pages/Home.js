import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
        }}>
            {/* Welcome Header */}
            <h1 style={{ fontSize: "32px", marginBottom: "10px", color: "#333" }}>
                Welcome to the Magic the gathering card Tracker!
            </h1>
            <p style={{ fontSize: "18px", color: "#666" }}>
                Build your MTG deck, search for cards, and track your collection!
            </p>

            {/* Fun MTG Card Feature */}
            <div style={{
                margin: "20px auto",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "500px"
            }}>
                <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>Featured MTG Card</h3>
                <img 
                    src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card"
                    alt="Black Lotus"
                    style={{
                        width: "100%",
                        maxWidth: "300px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                    }}
                />
                <p style={{ fontSize: "16px", marginTop: "10px", color: "#444" }}>
                    <strong>Black Lotus</strong> is one of the most powerful and expensive cards in Magic: The Gathering history!
                </p>
            </div>

            {/* Quick Navigation Buttons */}
            <div style={{ marginTop: "20px" }}>
                <Link to="/deck-builder">
                    <button style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}>
                        Go to Deck Builder
                    </button>
                </Link>

                <Link to="/about">
                    <button style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}>
                        Search for Cards
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;