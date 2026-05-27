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

      case 'meteo':
        url = 'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FParis&forecast_days=14';
        break;

      case 'feries':
        const year = new Date().getFullYear();
        url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
        break;

      case 'f1':
        const f1year = new Date().getFullYear();
        url = `https://api.openf1.org/v1/meetings?year=${f1year}`;
        break;

      case 'tmdb':
        const tmdbKey = process.env.TMDB_KEY;
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}&language=fr-FR&region=FR&page=1`;
        break;

      case 'football':
        const footKey = process.env.FOOTBALL_KEY;
        const compId = params.competition || '2015';
        const today = new Date().toISOString().split('T')[0];
        const in60 = new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0];
        url = `https://api.football-data.org/v4/competitions/${compId}/matches?dateFrom=${today}&dateTo=${in60}&status=SCHEDULED`;
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

    // Add auth header for football
    if (api === 'football') {
      options.headers['X-Auth-Token'] = process.env.FOOTBALL_KEY;
    }

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
