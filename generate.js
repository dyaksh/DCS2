const fs = require('fs');
const path = require('path');

const directoryPath = './assets/img/clients';

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter only image files (you can adjust the regex to match specific file types)
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));

  // Map files to JSON objects
  const imageList = imageFiles.map((file, index) => ({
    id: index + 1,
    src: `/assets/img/clients/${file}`,
    alt: path.parse(file).name, // Use file name without extension as alt text
  }));

  // Write JSON to file
  fs.writeFile('clientLogos.json', JSON.stringify(imageList, null, 2), function(err) {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('clientLogos.json file has been successfully generated.');
    }
  });
});
