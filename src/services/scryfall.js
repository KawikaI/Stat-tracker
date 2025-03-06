export const fetchCardByName = async (cardName) => {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`, {
        headers: { "User-Agent": "MTGDeckAnalyzer/1.0" }
      });
  
      if (!response.ok) {
        throw new Error("Card not found");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching card:", error);
      return null;
    }
  };