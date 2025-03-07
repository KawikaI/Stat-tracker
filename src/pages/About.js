import React, { useState } from "react";
import { fetchCardByName } from "../services/scryfall";

const Search = () => {
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(""); // error states fro missing cards

    const handleSearch = async () => {
        if (cardName.trim() === "") return;

        setError(""); // Clear previous errors
        setCardData(null); // Clear previous results

        const data = await fetchCardByName(cardName);
        
        if (data && data.image_uris) {
            setCardData(data);
            setError(""); // Reset error if a valid card is found
        } else {
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
            <p><strong>Try searching for: "Sol Ring" or "Black Lotus"</strong></p>

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

            {/* error if no card is found */}
            {error && (
                <p style={{
                    color: "red",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "10px",
                    padding: "10px",
                    border: "2px solid red",
                    borderRadius: "5px",
                    display: "inline-block",
                    backgroundColor: "#d9d0d0"
                }}>
                    {error}
                </p>
            )}

            {/* cisplay card data */}
            {cardData && (
                <div style={{
                    marginTop: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#d9d0d0",
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
                            backgroundColor: "#d9d0d0",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default Search;