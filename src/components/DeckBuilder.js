import React, { useEffect } from "react";

const DeckBuilder = () => {
  useEffect(() => {
    const loadHTMX = () => {
      if (window.htmx) {
        console.log("HTMX already loaded");
        window.htmx.process(document.body);
      } else {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/htmx.org@1.9.10";
        script.async = true;
        script.onload = () => {
          console.log("HTMX loaded");
          window.htmx.process(document.body);
        };
        document.body.appendChild(script);
      }
    };

    loadHTMX();
  }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <h2 style={{ fontSize: "32px", marginBottom: "20px", color: "#333" }}>
                Random Deck Generator
            </h2>
            <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
                Click a color to generate a random MTG deck!
            </p>

            <div className="color-buttons" style={{ marginBottom: "30px" }}>
                {["blue", "green", "black", "white", "red"].map((color) => (
                    <button 
                        key={color}
                        hx-post="/generate"
                        hx-vals={`{"color":"${color}"}`}
                        hx-target="#deck"
                        style={{
                            margin: "10px",
                            padding: "12px 24px",
                            backgroundColor: color === "white" ? "#f8f9fa" : 
                                              color === "black" ? "#343a40" : 
                                              color === "red" ? "#dc3545" : 
                                              color === "green" ? "#28a745" : 
                                              "#007bff",
                            color: color === "white" ? "#333" : "white",
                            border: color === "white" ? "1px solid #ccc" : "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                ))}
            </div>

            <div id="deck" style={{ marginTop: "30px" }}>
                {/* Deck will load here via HTMX */}
            </div>
        </div>
    );
};

export default DeckBuilder;