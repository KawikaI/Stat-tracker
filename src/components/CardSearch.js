import React, { useState } from "react";
import { fetchCardByName } from "../services/scryfall";

const Search = ({ addCardToDeck, deck }) => {
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (cardName.trim() === "") return;

        setError(""); // Clear previous errors

        const data = await fetchCardByName(cardName);
        if (data && data.image_uris) {
            setCardData(data);
            setError(""); // Reset error if card exists
        } else {
            setCardData(null);
            setError(`No card found for "${cardName}". Try another name!`);
        }
    };

    const isCardInDeck = cardData && deck.some((c) => c.id === cardData.id);

    return (
        <div style={styles.container}>
            <h1>Search for Magic: The Gathering Cards</h1>
            <p style={styles.description}>Use the search bar below to look up stats for any MTG card!</p>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Enter MTG Card Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.searchButton}>
                    Search
                </button>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            {cardData && (
                <div style={styles.cardContainer} onClick={() => addCardToDeck(cardData)}>
                    <div className="card-hover">
                        <img src={cardData.image_uris?.normal} alt={cardData.name} className="card-image" />
                        <div className="overlay">
                            <span className="plus-icon">{isCardInDeck ? "✔️" : "+"}</span>
                        </div>
                    </div>
                    <h2>{cardData.name}</h2>
                </div>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    },
    description: { fontSize: "18px", color: "#666" },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        width: "300px",
        height: "40px",
        fontSize: "18px",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    searchButton: {
        height: "40px",
        padding: "0 20px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    error: { color: "red", fontSize: "18px", fontWeight: "bold", marginTop: "10px" },
    cardContainer: { position: "relative", display: "inline-block", cursor: "pointer", marginTop: "20px" },
};

export default Search;