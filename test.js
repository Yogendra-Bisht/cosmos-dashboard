const axios = require('axios');
const API_KEY = 'Fg3StI4U1TydE1FEX2hfqjkQn88xG8r2dSAUD3Tg';

async function test() {
  try {
    const mars = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2024-01-01&api_key=${API_KEY}`);
    console.log('Mars Photos Count:', mars.data.photos?.length);
  } catch (e) {
    console.log('Mars Error:', e.response?.data || e.message);
  }

  try {
    const epic = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${API_KEY}`);
    console.log('EPIC Images Count:', epic.data?.length);
    console.log('EPIC Sample:', epic.data[0]);
  } catch (e) {
    console.log('EPIC Error:', e.response?.data || e.message);
  }
}
test();
