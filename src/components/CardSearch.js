import React, { useState, useEffect, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import { fetchCardByName } from "../services/scryfall";

// main card search function
const CardSearch = ({ addCardToDeck, deck }) => {
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // fetch suggestions from api
    const getSuggestions = async (value) => {
        if (!value) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`);
            const data = await response.json();
            setSuggestions(data.data.slice(0, 5)); // 5 suggestion limit
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setSuggestions([]);
        }
    };

    // auto suggest handlers
    const onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = async (_, { suggestion }) => {
        setCardName(suggestion);
        setError("");

        const data = await fetchCardByName(suggestion);
        if (data && data.image_uris) {
            setCardData(data);
            setError(""); 
        } else {
            setCardData(null);
            setError(`No card found for "${suggestion}". Try another name!`);
        }
    };

    const handleSearch = async () => {
      if (cardName.trim() === "") return;
  
      setError("");// clear all previoous errors
  
      const data = await fetchCardByName(cardName);
      if (data && data.image_uris) {
          setCardData(data);
          setError(""); // reset errors
      } else {
          setCardData(null);
          setError(`No card found for "${cardName}". Try another name!`);
      }
  };

    // Memoized renderSuggestion to prevent flickering
    const renderSuggestion = useCallback((suggestion, { isHighlighted }) => (
        <div
            className="suggestion-item"
            style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: isHighlighted ? "#f0f0f0" : "#fff",
                transition: "background-color 0.2s ease-in-out",
            }}
        >
            {suggestion}
        </div>
    ), []);

    const isCardInDeck = cardData && deck.some((c) => c.id === cardData.id);

    return (
        <div style={styles.container}>
            <h1>Search for Magic: The Gathering Cards</h1>
            <p style={styles.description}>Use the search bar below to look up stats for any MTG card!</p>

            <div className="searchContainer">
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={{
            placeholder: "Enter MTG Card Name",
            value: cardName,
            onChange: (_, { newValue }) => setCardName(newValue),
            className: "searchInput"
        }}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestionsContainer={({ containerProps, children }) => (
            <div {...containerProps} className="suggestions-dropdown">
                {children}
            </div>
        )}
    />
    <button onClick={handleSearch} className="searchButton">
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

// bunch of styles
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
        backgroundColor: "#f8f9fa",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    error: { color: "red", fontSize: "18px", fontWeight: "bold", marginTop: "10px" },
    cardContainer: { position: "relative", display: "inline-block", cursor: "pointer", marginTop: "20px" },
};

export default CardSearch;