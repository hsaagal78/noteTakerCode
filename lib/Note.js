const fs = require('fs');
const { v4 } = require('uuid');
const path = require('path');
const DB_PATH = path.join(__dirname, '../lib/notes.json');

function getNotes() {

  try {
    const notes = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    return notes;
    
  } catch (err) {
    return [];
  }
}

class Note {
  constructor(text) {
    this.id = v4();
    this.text = text;
   
  }

  save() {
    const notes = getNotes();

    notes.push(this);


    fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2), err => {
      if (err) throw err;

      console.log('Note saved successfully!');
    })
  }

  noteDelete(noteId) {
    
    const notes = getNotes();
  
    const updatedNotes = notes.filter(note => note.id !== noteId);
    
    fs.writeFile(DB_PATH, JSON.stringify(updatedNotes, null, 2), err => {
      if (err) throw console.error('Error deleting note:', err);
      
      console.log('Note deleted successfully!');
    });
  }

  updateNote() {
    
    const notes = getNotes();
    notes.push(this);
    console.log('notes');


    fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2), err => {
      if (err) throw err;

      console.log('Note saved successfully!');
    })
  }
}

module.exports = {Note: Note, getNotes: getNotes };
