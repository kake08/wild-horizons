// scripts/fetchImages.js
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const UNSPLASH_ACCESS_KEY = 'ZG2oGkqo2z6dWU7D3GTQIFHDNHJcW6JF9IePTlQkDDc'; // Get from unsplash.com/developers

async function fetchAndSaveImage(locationName, locationId) {
  try {
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, '../database/images');
    await fs.ensureDir(imagesDir);

    // Fetch image from Unsplash API
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: locationName,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular;
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      
      const fileName = `${locationId}_${locationName.replace(/\s+/g, '_')}.jpg`;
      const filePath = path.join(imagesDir, fileName);
      
      // Save image to local file
      const writer = fs.createWriteStream(filePath);
      imageResponse.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(fileName));
        writer.on('error', reject);
      });
    }
  } catch (error) {
    console.error(`Error fetching image for ${locationName}:`, error);
    return null;
  }
}

module.exports = { fetchAndSaveImage };