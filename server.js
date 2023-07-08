const express = require('express');
const { Note,getNotes } = require('./lib/Note');
const path = require ('path')


const app = express();
// const PORT = process.env.PORT || 3333;

// app.listen(PORT, () => console.log('sever started in port %s',PORT));

app.use(express.static('./public'));//public directory. It allows the server to directly serve any static files
app.use(express.json()); //This line adds middleware to parse incoming requests with JSON payloads.
app.get('/public/css/style.css', (clientReq, serverRes) => {
    serverRes.setHeader('Content-Type', 'text/css');
    serverRes.sendFile(path.join(__dirname, 'public', 'css', 'style.css',));
  });
  app.get('/public/css/jass.css', (clientReq, serverRes) => {
    serverRes.setHeader('Content-Type', 'text/css');
    serverRes.sendFile(path.join(__dirname, 'public', 'css', 'jass.css',));
  });
  app.get('/', (clientReq, serverRes) => {
    serverRes.sendFile(path.join(__dirname, 'public', 'index.html'));
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

  
    const note = new Note();
    note.id = noteId;
    note.updateNote(updatedText, noteId);
    serverRes.send({ message: 'Note updated successfully!' });
  
});


app.listen(3333, () => console.log('Server started on port 3333.'));





