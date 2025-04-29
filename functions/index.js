const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true });

exports.generateDeck = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Only POST allowed');
    }

    const color = req.body.color || req.body.toString().split('=')[1];
    if (!color) return res.status(400).send('Color not provided');

    try {
      let cards = [];
      while (cards.length < 15) {
        const response = await fetch(`https://api.scryfall.com/cards/random?q=color:${color}`);
        const data = await response.json();
        if (!data.card_back) {
          cards.push({
            name: data.name,
            image: data.image_uris?.small || '',
            type: data.type_line,
          });
        }
      }

      let html = '<div class="grid grid-cols-3 gap-4">';
      cards.forEach(card => {
        html += `
          <div class="border p-2 rounded shadow">
            <img src="${card.image}" alt="${card.name}" class="w-full mb-2">
            <div class="font-bold">${card.name}</div>
            <div class="text-sm text-gray-600">${card.type}</div>
          </div>`;
      });
      html += '</div>';

      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error generating deck');
    }
  });
});