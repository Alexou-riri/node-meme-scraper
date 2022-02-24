import axios from 'axios';
import fs from 'node:fs';
import cheerio from 'cheerio';
import https from 'node:https';

// import path from 'node:path';

// const app = express();
const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const memes = [];
const downloadedImgs = [];

// Create a new memes folder for saving the downloaded images if none exists
fs.mkdir('./memes', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

axios(url)
  .then((response) => {
    const html = response.data;
    // console.log(html);

    const $ = cheerio.load(html);

    // Get images URLs and put them into an array
    $('img').each((i, element) => {
      const imageUrl = $(element).attr('src'); // Reference for the image element
      memes.push(imageUrl);
    });
    // Taking first ten images and put them into new array
    for (let i = 0; i < 10; i++) {
      const images = memes[i];
      downloadedImgs.push(images);
    }
    // Loop through the first 10 images and downloads them
    for (let i = 0; i < 10; i++) {
      // Add 0 before an image number if necessary
      const path = i === 9 ? `./memes/${i + 1}.jpg` : `./memes/0${i + 1}.jpg`;
      const file = fs.createWriteStream(path);
      https.get(downloadedImgs[i], (res) => {
        res.pipe(file);
      });
    }

    $.html();
  })
  .catch((err) => console.log(err));
console.log('it worked');
