import React from "react";

// simpe deck list func
const DeckList = ({ deck }) => {
  return (
    <div>
      <h3>Deck List ({deck.length} cards)</h3>
      <ul>
        {deck.map((card, index) => (
          <li key={index}>
            <img src={card.image_uris?.small} alt={card.name} width="50" />
            {card.name} - {card.mana_cost} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckList;