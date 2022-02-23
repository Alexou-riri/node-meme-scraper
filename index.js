import fs from 'node:fs';
import axios from 'axios';
import cheerio from 'cheerio';
// import express from 'express';
import https from 'node:https';
import fetch from 'node-fetch';
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
      https.get(downloadedImgs[i], function (response) {
        response.pipe(file);
      });
    }

    $.html();
  })
  .catch((err) => console.log(err));

// for (let i = 0; i < 10; i++) {
//   fs.open(`./memes/0${i + 1}.jpg`, 'w', (err) => {
//     if (err) {
//       throw err;
//     }
//   });
//   const image = memes[i];
//   fetch(image)
//     .then((res) =>
//       res.body.pipe(fs.createWriteStream(`.memes/0${i + 1}.jpg`)),
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(image);
// }

//   const $ = cheerio.load(html);
//   $('img', html).each(function () {
//     const url = $(this).find('img').attr('src');
//     memes.push({
//       url,
//     });
//   });
//   console.log(memes);
// })
// .catch((err) => console.log(err));

//     // const memes = Array.from($('.meme-img'));
//     function getImages(html) {
//       const items = $('img');
//       const list = [];
//       const result = Array.from($('.meme-img'));
