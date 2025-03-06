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

    const removeCardFromDeck = (cardToRemove) => {
        setDeck(deck.filter((card) => card.id !== cardToRemove.id));
    };

    const createDeck = () => {
        if (!deckName.trim()) return;
        const newDeck = [{ id: "deck-placeholder", name: deckName, format: deckFormat, description: deckDescription }];
        setDeck(newDeck);
        setShowCreateDeckForm(false);
        localStorage.setItem("deck", JSON.stringify(newDeck));
    };

    const clearDeck = () => {
        setDeck((prevDeck) => (prevDeck.length > 0 ? [prevDeck[0]] : []));
        localStorage.setItem("deck", JSON.stringify([deck[0]]));
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Deck Builder</h2>

            {showCreateDeckForm ? (
                <div style={styles.deckForm}>
                    <h3 style={{ textAlign: "center" }}>Create a New Deck</h3>
                    
                    <div style={styles.inputGroup}>
                        <label><strong>Deck Name:</strong></label>
                        <input 
                            type="text" 
                            placeholder="Enter deck name..." 
                            value={deckName} 
                            onChange={(e) => setDeckName(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label><strong>Format:</strong></label>
                        <select 
                            value={deckFormat} 
                            onChange={(e) => setDeckFormat(e.target.value)}
                            style={styles.input}
                        >
                            <option value="Commander">Commander</option>
                            <option value="Standard">Standard</option>
                            <option value="Modern">Modern</option>
                            <option value="Pioneer">Pioneer</option>
                            <option value="Legacy">Legacy</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label><strong>Description:</strong></label>
                        <textarea 
                            placeholder="Enter a short deck description..." 
                            value={deckDescription} 
                            onChange={(e) => setDeckDescription(e.target.value)}
                            rows="3"
                            style={styles.input}
                        />
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <button onClick={createDeck} style={styles.createButton}>Create Deck</button>
                        <button onClick={() => setShowCreateDeckForm(false)} style={styles.cancelButton}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={styles.deckInfo}>
                        <h3 style={{ textAlign: "center" }}>{deck[0]?.name}</h3>
                        <p><strong>Format:</strong> {deck[0]?.format}</p>
                        <p><strong>Description:</strong> {deck[0]?.description || "No description provided."}</p>
                    </div>

                    <CardSearch addCardToDeck={addCardToDeck} deck={deck} />

                    <div style={styles.deckContainer}>
                        <h3>Your Cards</h3>
                        {deck.length <= 1 ? (
                            <p>No cards in deck</p>
                        ) : (
                            <ul style={{ listStyleType: "none", padding: "0" }}>
                                {deck.slice(1).map((card) => (
                                    <li 
                                        key={card.id} 
                                        className="deck-card-hover" 
                                        onClick={() => removeCardFromDeck(card)}
                                    >
                                        <span className="minus-icon">−</span>
                                        <span className="deck-card-name">{card.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button onClick={clearDeck} style={styles.clearButton}>Clear Deck</button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    deckForm: {
        border: "2px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
    },
    inputGroup: { marginBottom: "15px" },
    input: {
        width: "100%", 
        padding: "8px", 
        marginTop: "5px", 
        borderRadius: "5px", 
        border: "1px solid #ccc"
    },
    createButton: {
        padding: "10px 20px",
        marginRight: "10px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    cancelButton: {
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    deckInfo: {
        border: "2px solid #333",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        margin: "auto",
        marginBottom: "20px"
    },
    deckContainer: {
        border: "2px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "20px"
    },
    clearButton: {
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};

export default DeckBuilder;