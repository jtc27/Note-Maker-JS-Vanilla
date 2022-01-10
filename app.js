// Book class: represents a Book
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: Handle UI tasks
class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book))
  }

  static addBookToList(book){
    const list = document.querySelector('#book-list'); // grabs the element in the DOM

    const row = document.createElement('tr'); //creates tr tag in site

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    row.innerHTML = `
    <td>${timestamp}</td>
    <td>${book.title}</td>
    <td>${book.note}</td>
    <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row) // appends row to the list
  }

  static deleteBook(elem){
    if (elem.classList.contains('delete')) {
      elem.parentElement.parentElement.remove();
      // parent is <td>, the parent of that is <tr> row.  we want to delete the entire row
    }
  }

  // method shows successful submit or empty field alert
  static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;  //Bootstrap alert
    div.appendChild(document.createTextNode(message)) 

    const container = document.querySelector('.container') //parent
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form); //puts it in div class = container, before #book-form

    // vanish in 3 seconds
    setTimeout(()=> document.querySelector('.alert').remove(), 3000)
  }

  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }


}

// Store class: Handles storage
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books')) //string >> JS objects
    }
    return books
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books)) // JS object >> string
  }

  static removeBook(isbn)
  {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) 
      {
        books.splice(index, 1);
      }
    });
    // loops through all books
    // if the current book being looped through matches isbn, splice it out

    //reset local storage with that book removed:
    localStorage.setItem('books', JSON.stringify(books)) // JS object >> string
  }
}
// Local Storage can't hold objects, they have to be strings
// In retrieval we parse it back to an object

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => 
{
  //Prevent acutual submit
  e.preventDefault();

  //Get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  //validate
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('Please fill in all fields', 'danger')  // Bootstrap
    // alert('Please fill in all fields')  *standard JS alert
  } else {
    //instantiate Book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBookToList(book);

    //Add Book to Store class
    Store.addBook(book);

    //Show Book added
    UI.showAlert('Book Added', 'success')

    //clear fields after "add book" button pressed
    UI.clearFields()
    }
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => 
{
  // Removes book from UI
  UI.deleteBook(e.target)

  // Removes book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // parent goes up to <td>, 
  // previous element goes to previous <td>
  // textContent gets ${book.isbn}  *innertext also works*
  // traversing DOM

   //Show Book added
   UI.showAlert('Book removed', 'success')
})

// Inject the time in the UI
var renderTime = function () {
	var time = new Date();
	clock.textContent = time.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
};

// Render the time on load
renderTime();

// Update the time every second
setInterval(renderTime, 1000)