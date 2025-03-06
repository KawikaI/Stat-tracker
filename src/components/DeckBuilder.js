import React, { useState, useEffect } from "react";
import CardSearch from "../components/CardSearch";

const DeckBuilder = () => {
    const [deck, setDeck] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [deckFormat, setDeckFormat] = useState("Commander");
    const [deckDescription, setDeckDescription] = useState("");
    const [showCreateDeckForm, setShowCreateDeckForm] = useState(true);

    useEffect(() => {
        const savedDeck = JSON.parse(localStorage.getItem("deck"));
        if (savedDeck && savedDeck.length > 0) {
            setDeck(savedDeck);
            setShowCreateDeckForm(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("deck", JSON.stringify(deck));
    }, [deck]);

    const addCardToDeck = (card) => {
        if (!deck.some((c) => c.id === card.id)) {
            const updatedDeck = [...deck, card];
            setDeck(updatedDeck);
        }
    };

    const createDeck = () => {
        if (!deckName.trim()) return;
        const newDeck = [{ id: "deck-placeholder", name: deckName, format: deckFormat, description: deckDescription }];
        setDeck(newDeck);
        setShowCreateDeckForm(false);
        localStorage.setItem("deck", JSON.stringify(newDeck));
    };

    const clearDeck = () => {
        setDeck((prevDeck) => prevDeck.length > 0 ? [prevDeck[0]] : []);
        localStorage.setItem("deck", JSON.stringify([deck[0]]));
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Deck Builder</h2>

            {/* Deck Creation Form */}
            {showCreateDeckForm ? (
                <div style={{
                    border: "2px solid #ccc",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: "600px",
                    margin: "auto",
                }}>
                    <h3 style={{ textAlign: "center" }}>Create a New Deck</h3>
                    
                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>Deck Name:</strong></label>
                        <input 
                            type="text" 
                            placeholder="Enter deck name..." 
                            value={deckName} 
                            onChange={(e) => setDeckName(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>Format:</strong></label>
                        <select 
                            value={deckFormat} 
                            onChange={(e) => setDeckFormat(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        >
                            <option value="Commander">Commander</option>
                            <option value="Standard">Standard</option>
                            <option value="Modern">Modern</option>
                            <option value="Pioneer">Pioneer</option>
                            <option value="Legacy">Legacy</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label><strong>Description:</strong></label>
                        <textarea 
                            placeholder="Enter a short deck description..." 
                            value={deckDescription} 
                            onChange={(e) => setDeckDescription(e.target.value)}
                            rows="3"
                            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <button onClick={createDeck} style={{
                            padding: "10px 20px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}>Create Deck</button>

                        <button onClick={() => setShowCreateDeckForm(false)} style={{
                            padding: "10px 20px",
                            borderRadius: "5px",
                            backgroundColor: "#d9534f",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{
                        border: "2px solid #333",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        maxWidth: "600px",
                        margin: "auto",
                        marginBottom: "20px"
                    }}>
                        <h3 style={{ textAlign: "center" }}>{deck[0]?.name}</h3>
                        <p><strong>Format:</strong> {deck[0]?.format}</p>
                        <p><strong>Description:</strong> {deck[0]?.description || "No description provided."}</p>
                    </div>

                    <CardSearch addCardToDeck={addCardToDeck} userHasDeck={deck.length > 0} />

                    <div style={{
                        border: "2px solid #ccc",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#f9f9f9",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        maxWidth: "600px",
                        margin: "auto",
                        marginTop: "20px"
                    }}>
                        <h3>Your Cards</h3>
                        <ul style={{ listStyleType: "none", padding: "0" }}>
                            {deck.slice(1).map((card) => (
                                <li key={card.id} style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #ddd"
                                }}>{card.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button onClick={clearDeck} style={{
                            padding: "10px 20px",
                            borderRadius: "5px",
                            backgroundColor: "#d9534f",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}>Clear Deck</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DeckBuilder;