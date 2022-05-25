const router = require('express').Router();
const fs = require('fs');
const savedNotes = require ('../../db/db.json');

//get/api/notes should read db.json file and return all saved notes as json
router.get('/api/notes', (req, res) => {
        let results=oldNotes
        res.json(results)
    });

function findById(id, noteArray) {
        const result = noteArray.filter((note) => note.id === id)[0];
        return result;
      }
    
router.get('/api/notes/:id', (req, res) => {
        const result = findById(req.params.id, savedNotes);
        if (result) {
          res.json(result);
        } else {
          res.send(404);
        }
      });


function createNewNote (body, notesArray) { 
    const newNote= body;
    f (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname,'../..db/db.json'),
        JSON.stringify (notesArray), null,2);

    return newNote;
};

// posting note function route receives a new note to save on request body, then adds it to the json file,
//then returns it to the client 
router.post('/api/notes', (req, res) => {
    req.body.id = oldNotes.length.toString();
    // req.body is where our incoming content will be
    const oldNotes = createNewNote(req.body, oldNotes);
  
    res.json(notexs);
    
  
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray[i];
  
      if (note.id == id) {
        notesArray.splice(i, 1);
        fs.writeFileSync(
          path.join(__dirname, '../../db.json'),
          JSON.stringify(notesArray, null, 2)
        );
  
        break;
      }
    }
  }
  
router.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, savedNotes);
    res.json(true);
});



module.exports = router;