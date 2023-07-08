const express = require('express');
const { Note,getNotes } = require('./lib/Note');
const path = require ('path')


const app = express();
// const PORT = process.env.PORT || 3333;

// app.listen(PORT, () => console.log('sever started in port %s',PORT));

app.use(express.static('./public'));
app.use(express.json()); 
app.get('/public/css/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'style.css',));
  });
  app.get('/public/css/jass.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'jass.css',));
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


  app.get('/notes',(clientReq,serverRes) => {
    const notes = getNotes();
    serverRes.send(notes);
  });
  

// Post route to retrieve the form data
app.post('/notes', (clientReq, serverRes) => {

  const newNote = new Note(clientReq.body.text);
 
  newNote.save();
 
  serverRes.redirect('/');
});


app.delete('/notes/:id', (clientReq, serverRes) => {
  
 
  const noteId = clientReq.params.id;
  const note = new Note();
  note.noteDelete(noteId)
  serverRes.send({ message: 'Note deleted successfully!' });
  
});
app.put('/notes/:id', (clientReq, serverRes) => {
  const noteId = clientReq.params.id;
  const updatedText = clientReq.body.text;

  console.log('Request Body:', clientReq.body);

  if (updatedText !== null && updatedText !== undefined) {
    const note = new Note();
    note.id = noteId;
    note.updateNote(updatedText, noteId);
    serverRes.send({ message: 'Note updated successfully!' });
  } else {
    console.error('Error updating note: Invalid data');
    serverRes.status(400).send({ error: 'Invalid data' });
  }
});


app.listen(3333, () => console.log('Server started on port 3333.'));





