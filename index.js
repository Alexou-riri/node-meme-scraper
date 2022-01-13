import fetch from 'node-fetch';

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((text) => console.log(text));

/*

const http = require('https://memegen-link-examples-upleveled.netlify.app/');

const server = http.createServer();
server.on('request', (request, response) => {});
*/

// const fs = require('fs'); // Built-in filesystem package for Node.js
// const fetch = require('node-fetch');

// const imageUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// fetch(imageUrl).then((res) => res.body.pipe(fs.createWriteStream('./memes')));
