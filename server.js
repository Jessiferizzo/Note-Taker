//require express.js 
const express = require('express');
const savedNotes = require('./db/db');
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


function createNewNote(body, savedNotesArray) {
  const newNote = body;
  savedNotesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify( {savedNotes:savedNotesArray }, null, 2)
  );
  return newNote;
}

function findById(id, savedNotesArray) {
  const result = savedNotesArray.filter(note => note.id === id)[0];
  return result;
}

function deleteNote(id, savedNotesArray) {
  for (let i = 0; i < savedNotesArray.length; i++) {
    let note = savedNotesArray[i];

    if (note.id == + id) {
      savedNotesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(savedNotesArray, null, 2)
      );

      break;
    }
  }
}


//api routes, displays notes// works YES//
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    res.json(savedNotes);
  });
});
  
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, savedNotes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = savedNotes.length.toString();
  // if any data in req.body is incorrect, send 400 error back
  const postNote = createNewNote(req.body, savedNotes)
  res.json(postNote);
});

//delete route
app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, savedNotes);
  res.json(true);
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