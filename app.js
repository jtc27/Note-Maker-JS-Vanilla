// Note class
class Note {
  constructor(time_logged, title, message){
    this.time_logged = time_logged;
    this.title = title;
    this.message = message;
  }
}

// UI Class
class UI {
  static displayNotes(){
    const StoredNotes = [
      {
        time_logged: 'January 11, 2022, 5:08:39 PM',
        title: 'jogging',
        message: 'go jogging'
      },
      {
        time_logged: 'January 11, 2022, 6:11:59 PM',
        title: 'bank',
        message: 'go to the bank'
      },
    ];

    const notes = StoredNotes;

    notes.forEach((note) => UI.addNoteToList(note));
  }

  static addNoteToList(note){
      const list = document.querySelector('#note-list');

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${note.time_logged}</td>
        <td>${note.title}</td>
        <td>${note.message}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
  }
}

// Store class: Handles storage

// Event: Display Notes
document.addEventListener('DOMContentLoaded', UI.displayNotes);

// Event: Add Note
document.querySelector('#note-form').addEventListener('submit', (e)=> {

  // Prevent actual submit, because it's a submit event
  e.preventDefault();

  //get form values
  var time_logged = new Date();
  const title = document.querySelector('#title').value;
  const message  = document.querySelector('#message').value;

  //instantiate note
  const note = new Note(time_logged.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}), title, message)

  //Add note to UI
  UI.addNoteToList(note);
})

// Event: Remove Note


// Inject the time in the UI
var renderTime = function () {
	var time = new Date();
	clock.textContent = time.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
};

// Render the time on load
renderTime();

// Update the time every second
setInterval(renderTime, 1000)