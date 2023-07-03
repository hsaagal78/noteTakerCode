const outputE1 = document.querySelector('#saveNote');

function outputNotes() {
  fetch('/notes')
    .then(res => res.json())
    .then(data => {
        console.log(data);
      data.forEach(noteObj => {
        outputE1.insertAdjacentHTML('beforeend', `
          <div class="modal-contner">
            <div class="modal">
              <button class="modal_btn">&times;</button>
              <h3 class="modal_body">${noteObj.text}</h3>
              <button class="modalM_btn">&#9998;</button>
            </div>
          </div>
        `);
      });
    });
}

outputNotes();