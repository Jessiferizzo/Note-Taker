const router = require('express').Router();
const fs = require('fs');
const savedNotes = require ('../../db/db.json');

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
router.post('/notes', (req, res) => {
        const newNote= createNewNote (req.body, savedNotes);
        return res.json(newNote);
    });
    

function findById(id, noteArray) {
    const result = noteArray.filter((note) => note.id === id)[0];
    return result;
  }

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, savedNotes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

  
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
  
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, savedNotes);
    res.json(true);
});

router.get('api/notes', (req, res) => {
    res.json(savedNotes.slice(1));
});


//get/api/notes should read db.json file and return all saved notes as json
router.get('/notes', (req, res) => {
        let results= savedNotes
        res.json(results)
    });

//finds notes by id
router.get('/notes/:id', (req, res) => {
        const result = findById(req.params.id, savedNotes);
        if (result) {
          res.json(result);
        } else {
          res.send(404);
        }
      });
  

module.exports = router;