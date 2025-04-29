import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: "#1a1a1a", // Dark background
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            borderBottom: "3px solid gold",
            fontFamily: "'Cinzel', serif"
        }}>
            <h1 style={{
                color: "gold",
                fontSize: "24px",
                marginRight: "30px",
                textShadow: "2px 2px 4px rgba(255, 215, 0, 0.7)"
            }}>
                MTG Tracker
            </h1>

            <div style={{
                display: "flex",
                gap: "20px"
            }}>
                <Link to="/" style={navLinkStyle}>Home</Link>
                <Link to="/deck-builder" style={navLinkStyle}>Deck Gen</Link>
                <Link to="/about" style={navLinkStyle}>Search</Link>
            </div>
        </nav>
    );
};

// 🔹 Styles for the links
const navLinkStyle = {
    textDecoration: "none",
    color: "gold",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "0.3s ease-in-out",
    backgroundColor: "rgba(255, 215, 0, 0.1)"
};

// 🔹 Add hover effect
const linkHoverEffect = `
    a:hover {
        background-color: rgba(255, 215, 0, 0.3);
        transform: scale(1.05);
    }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = linkHoverEffect;
document.head.appendChild(styleSheet);

export default Navbar;