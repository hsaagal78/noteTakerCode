//This code adds an event listener to the element with the ID addNote. It listens for a click event 
//and prevents the default behavior of submitting a form
document.querySelector('#addNote').addEventListener('click', (event) => {
  event.preventDefault(); 
  const noteInput = document.querySelector('.input');
  const noteText = noteInput.value.trim();
  if (noteText !== '') {
    saveObj(noteText);
    noteInput.value = ''; 
    outputNotes(); 
  } else {
    console.error('Error: Note text is empty');
  }
});
//This code defines the outputNotes() function, which is responsible 
//for fetching notes data from the /notes endpoint.
// and create new elements that needs.
const outputE1 = document.querySelector('#saveNote');
function outputNotes() {
  fetch('/notes')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      outputE1.innerHTML = '';
      data.forEach(noteObj => {
        outputE1.insertAdjacentHTML('beforeend', `
          <div class="modal-contner">
            <div class="modal">
              <button class="modal_btn" data-note-id="${noteObj.id}">&times;</button>
              <h3 class="modal_body">${noteObj.text}</h3>
              <h3 class="modal_id" style="color: white; font-size: 2px;">${noteObj.id}</h3>
              <button class="modalM_btn" data-update-id="${noteObj.id}" data-modal-update-body='${noteObj.text}'>&#9998;</button>
            </div>
          </div>
        `);
      });
    });
}

outputNotes();

//This code adds an event listener to the element with the class contain, 
//which represents the container for the notes.
const deleteNoteContainer = document.querySelector('.contain');
deleteNoteContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal_btn')) {
    const noteId = event.target.getAttribute('data-note-id');
    const deletedNote = document.querySelector(`[data-note-id="${noteId}"]`);
    deletedNote.parentNode.remove();
    handleDeleteNote(noteId);
  }
});
//This code adds an event listener to the element with the class updateNote, 
//which represents the container for the update notes.
const updateNoteContainer = document.querySelector('.updateNote');
updateNoteContainer.addEventListener('click', (event) => {
     event.preventDefault(); 
  if (event.target.classList.contains('modalM_btn')) {
     const noteId = event.target.getAttribute('data-update-id');
    if (noteId !== '') {
      handleUpdateNote(noteId);
      outputNotes(); 
    } else {
      console.error('Error: Note text is empty');
    }
    
  }
});
// function to delete existing note and sending the messages as fetch request.
function handleDeleteNote(noteId) {
  fetch(`/notes/${noteId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log('Note deleted successfully:', data.message);
      outputNotes();
    })
    .catch(err => {
      console.error('Error deleting note:', err);
    });
}
//function to update existing note and sending the new note as fetch request. 
function handleUpdateNote(noteId) {
  const noteToUpdate = document.querySelector(`[data-update-id="${noteId}"]`);
  const newnoteToUpdate = noteToUpdate.querySelector('.modal_body');
  const currentText = noteToUpdate.dataset.modalUpdateBody;
  const newText = window.prompt('Enter the new note text:', currentText);
  const requestData = {text: newText};
    fetch(`/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Note updated successfully:', data.message);
        newnoteToUpdate.innerText = newText;
        outputNotes();
      })
      .catch(err => {
        console.error('Error updating note:', err);
      });
 
}
//Function to save the new note and senting the note in fetch request. 
function saveObj(noteText) {
  const requestData = {text: noteText};
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData),
  })
    .then(res => {
      console.log(res); 
      return res.json();
    })
    .then(data => {
      outputNotes();
    })
    .catch(err => {
      console.error('Error updating note:', err);
    });
}















