export const fetchCardByName = async (cardName) => {
  try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
      if (!response.ok) {
          return null; // Return null if API request fails (e.g., card not found)
      }
      const data = await response.json();
      if (!data || data.object === "error") {
          return null; // Ensure errors return null
      }
      return data;
  } catch (error) {
      console.error("Error fetching card:", error);
      return null;
  }
};