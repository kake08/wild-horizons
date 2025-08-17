const fs = require('fs');
const { fetchAndSaveImage } = require('./fetchImages');

async function updateDatabaseWithImages() {
  try {
    // Read your existing data.js file
    const dataPath = './data/data.js';
    let fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Extract the data array (simple regex approach)
    const dataMatch = fileContent.match(/export const data = (\[[\s\S]*\]);/);
    if (!dataMatch) {
      throw new Error('Could not parse data array from data.js');
    }
    
    // Parse the JavaScript array
    const data = eval(dataMatch[1]);
    
    // Fetch images for each location
    for (let i = 0; i < data.length; i++) {
      const location = data[i];
      if (!location.image) {
        console.log(`Fetching image for: ${location.name}`);
        try {
          const fileName = await fetchAndSaveImage(location.name, location.uuid);
          if (fileName) {
            data[i].image = fileName;
          }
          // Add delay to respect API rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error fetching image for ${location.name}:`, error);
        }
      }
    }
    
    // Write updated data back to data.js
    const updatedContent = `export const data = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataPath, updatedContent);
    console.log('Database updated with image filenames');
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

updateDatabaseWithImages();