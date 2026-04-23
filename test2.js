const axios = require('axios');
const API_KEY = 'Fg3StI4U1TydE1FEX2hfqjkQn88xG8r2dSAUD3Tg';

async function test() {
  try {
    console.log('Testing EPIC...');
    const epic = await axios.get(`https://api.nasa.gov/EPIC/api/natural?api_key=${API_KEY}`);
    console.log('EPIC Success! Count:', epic.data.length);
  } catch (e) {
    console.log('EPIC Error:', e.message);
  }

  try {
    console.log('Testing Mars...');
    const mars = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-01-01&api_key=${API_KEY}`);
    console.log('Mars Success! Count:', mars.data.photos?.length);
  } catch (e) {
    console.log('Mars Error:', e.message);
  }
}
test();
