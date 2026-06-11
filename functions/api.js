const https = require('https');
const http = require('http');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { api, ...params } = event.queryStringParameters || {};

  if (!api) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing api parameter' }) };
  }

  let url = '';

  try {
    switch(api) {

      // Seule API externe utilisée : météo (Open-Meteo, CC BY 4.0 — attribution requise).
      // ⚠️ Usage commercial : l'offre gratuite Open-Meteo est non commerciale (cf. PROJECT.md, sujets 1 & 7).
      case 'meteo':
        url = 'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FParis&forecast_days=14';
        break;

      default:
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Unknown api' }) };
    }

    // Fetch the URL
    const data = await fetchUrl(url, api);
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

  } catch(err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};

function fetchUrl(url, api) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const options = { headers: {} };

    lib.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('Invalid JSON response')); }
      });
    }).on('error', reject);
  });
}
