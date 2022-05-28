//require express.js 
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//when Heroku runs our app it sets an environment variable called process.env.PORT, tells app to use that port if its set and if not
//default to port 3001
const PORT = process.env.PORT || 3001;
//instantiate the server and tell it to listen for requests
const app = express();


// This sets up data parsing-- Express will interpret it/format data as JSON.
// This is required for API calls!
//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//replaced hard code with port variable
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });