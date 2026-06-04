let library = [];

let Book = function(title,author,pages,sn,read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.sn = sn;
  this.read = !!read;

}

let addBook = function(title,author,pages,sn,read){
  let book = new Book(title,author,pages,sn,read);
  library.push(book);
}

function removeBookBySN(sn){
  const idx = library.findIndex(b => String(b.sn) === String(sn));
  if (idx !== -1) library.splice(idx, 1);
}


addBook("harry", "hen", 13, 1929, true);
addBook("darry", "hen", 13, 1929, false);
addBook("garry", "hen", 13, 1929, false);
addBook("zarry", "hen", 13, 1929, true);

let tableBody = document.querySelector(".table-body");

let addView = function (){
  tableBody.innerHTML = '';              // clear previous rows
    library.forEach(book => {
    let row = document.createElement('tr');
    // show a checkmark if read, otherwise an X
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.sn}</td>
        <td class="read-cell"><input type="checkbox" class="read-toggle" data-sn="${book.sn}" ${book.read ? 'checked' : ''}></td>
        <td><button class="delete" data-sn="${book.sn}">DELETE</button></td>
      `;
    tableBody.appendChild(row);
  });
}
if (tableBody) addView();
let form = document.querySelector(".form");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let sn = document.querySelector("#sn");
    if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isRead = document.getElementById('read') ? document.getElementById('read').checked : false;
    addBook(title.value,author.value,pages.value,sn.value,isRead)
   addView();
    form.reset();
  });
}

if (tableBody) {
  tableBody.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.delete')) {
      const sn = e.target.dataset.sn;
      removeBookBySN(sn);
      addView();
    }
  });

  // handle toggling read checkbox
  tableBody.addEventListener('change', (e) => {
    if (e.target && e.target.matches('.read-toggle')) {
      const sn = e.target.dataset.sn;
      const book = library.find(b => String(b.sn) === String(sn));
      if (book) book.read = e.target.checked;
    }
  });
}


