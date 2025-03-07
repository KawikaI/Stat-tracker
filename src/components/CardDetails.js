export const fetchCardByName = async (cardName) => {
  try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
      if (!response.ok) {
          return null; // return null if api requests fail
      }
      const data = await response.json();
      if (!data || data.object === "error") {
          return null; // errors return null
      }
      return data;
  } catch (error) {
      console.error("Error fetching card:", error);
      return null;
  }
};