import React, { useState } from "react";
import { fetchCardByName } from "../services/scryfall";

const Search = () => {
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(""); // 🔹 New state for error message

    const handleSearch = async () => {
      if (cardName.trim() === "") return;
  
      setError(""); // Clear previous errors
      setCardData(null); // Clear old card data
  
      console.log(`Searching for card: ${cardName}`); // Debugging log
  
      const data = await fetchCardByName(cardName);
      
      if (data && data.image_uris) {
          console.log("Card found:", data.name); // Debugging log
          setCardData(data);
          setError(""); // Reset error if card exists
      } else {
          console.warn("Card not found:", cardName); // Debugging log
          setCardData(null);
          setError(`No card found for "${cardName}". Try another name!`);
      }
  };

    return (
        <div style={{
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
        }}>
            <h1>Search for Magic: The Gathering Cards</h1>
            <p style={{ fontSize: "18px", color: "#666" }}>
                Use the search bar below to look up stats for any MTG card!
            </p>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px"
            }}>
                <input
                    type="text"
                    placeholder="Enter MTG Card Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    style={{
                        width: "300px",
                        height: "40px",
                        fontSize: "18px",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />
                <button 
                    onClick={handleSearch}
                    style={{
                        height: "40px",
                        padding: "0 20px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Search
                </button>
            </div>

            {/* 🔹 Display Error Message if Card Not Found */}
            {error && (
                <p style={{
                    color: "red",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "10px"
                }}>
                    {error}
                </p>
            )}

            {/* 🔹 Show Card Data if Found */}
            {cardData && (
                <div style={{
                    marginTop: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: "500px",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <h2>{cardData.name}</h2>
                    <img 
                        src={cardData.image_uris?.normal} 
                        alt={cardData.name} 
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default Search;