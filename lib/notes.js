const fs = require('fs');
const path = require('path');

function createNewNote (body, savedNotesArray) { 
    const newNote= body;
    savedNotesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname,'../../db/db.json'),
        JSON.stringify( {savedNotes: savedNotesArray}, null,2)
    );
    console.log(savedNotesArray, 'savedNotesArray');
    return newNote;
};

function findById(id, savedNotesArray) {
    const result = savedNotesArray.filter(savedNote => savedNote.id === id)[0];
    return result;
}

function deleteNote(id, savedNotesArray) {
    for (let i = 0; i < savedNotesArray.length; i++) {
      let note = savedNotesArray[i];
  
      if (note.id ==+ id) {
        savedNotesArray.splice(i, 1);
        fs.writeFileSync(
          path.join(__dirname, '../../db/db.json'),
          JSON.stringify(savedNotesArray, null, 2)
        );
  
        break;
      }
    }
  }



module.exports = {
    findById,
    createNewNote,
    deleteNote,
  };