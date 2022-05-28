const fs = require('fs');
const path = require('path');

function createNewNote (body, savedNotesArray) { 
    const note= body;
    savedNotesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: savedNotesArray }, null, 2)
      );
      return note;
}

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
          path.join(__dirname, '../db/db.json'),
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