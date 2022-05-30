//require express.js 
const express = require('express');
let notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');

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

// Create new note
app.post('/api/notes', function (req, res) {
  let randLetter = String.fromCharCode(35 + Math.floor(Math.random() * 26));
  let id = randLetter + Date.now();
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile('db/db.json', stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log("Saved");
    }
  });
});

// Delete note
app.delete('/api/notes/:id', function (req, res) {
  let noteID = req.params.id;
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log("note.id", note.id);
      console.log("noteID", noteID);
      return note.id !== noteID;
    });
    notes=updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile('db/db.json', stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Done Deleted");
      }
    });
    res.json(stringifyNote);
  });
});
    

//api routes, displays notes// works YES//
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});
  
app.get('/api/notes/:id', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});

//HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//sends notes to the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//sends to homepage if path issue
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


//replaced hard code with port variable
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});