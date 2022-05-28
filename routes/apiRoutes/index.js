const router = require('express').Router();
const {savedNotes} = require ('../../db/db.json');
const {findById, createNewNote, deleteNote } = require('../../lib/notes');

//get/api/notes should read db.json file and return all saved notes as json
router.get('/api/notes', (req, res) => {
  let results= savedNotes;
  res.json(results);
});

 router.get('/api/notes/:id', (req, res) => {
          const result = findById(req.params.id, savedNotes);
          if (result) {
            res.json(result);
          } else {
            res.send(404);
          }
        });


router.post('/api/notes', (req,res) => {
  // set id based on what the next index of the array will be
        req.body.id = savedNotes.length.toString();
        // if any data in req.body is incorrect, send 400 error back
        const noteBar= createNewNote(req.body, savedNotes);
        res.json(noteBar);
    });

router.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, savedNotes);
    res.json(true);
});

module.exports = router;