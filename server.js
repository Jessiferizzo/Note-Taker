//require express.js 
const express = require('express');
//instantiate the serve and tell it to listen for requests
const app = express();

const {  } = require('./data/animals');

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });