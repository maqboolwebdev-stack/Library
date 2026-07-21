class Book {
  #id;
  #title;
  #author;
  #pages;
  #read;
  #color;

  constructor(id, title, author, pages, read) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
    this.#color = colorGenerator();
  }

  // Getters

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get read() {
    return this.#read;
  }

  get color() {
    return this.#color;
  }

  // Setters

  set id(id) {
    this.#id = id;
  }

  set title(title) {
    this.#title = title;
  }

  set author(author) {
    this.#author = author;
  }

  set pages(pages) {
    this.#pages = pages;
  }

  set read(read) {
    this.#read = read;
  }

  // Toggle read status

  toggleRead() {
    this.#read = !this.#read;
  }
}

// DOM Elements
const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const pageInput = document.querySelector('.page');
const statusInput = document.querySelector('.status');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.books-container');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.querySelector('form');

const myLibrary = [];

function seedLibrary() {
  const defaultBooks = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      pages: 320,
      read: true,
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      pages: 280,
      read: false,
    },
    {
      title: 'Think like a Programmer',
      author: 'V. Anton Sprual',
      pages: 260,
      read: true,
    },
    {
      title: ' Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      pages: 435,
      read: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Dav Thomas,Andy Hunt',
      pages: 497,
      read: false,
    },
  ];

  defaultBooks.forEach((book) => {
    addBookToLibrary(book.title, book.author, book.pages, book.read);
  });
}

seedLibrary();
renderBooks();

// Color generator
function colorGenerator() {
  const hue = Math.floor(Math.random() * 360);

  const saturation = '39%';
  const lightness = '47%';
  const alpha = 0.5;

  return `hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`;
}


// Prototype method (toggle read)
// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };

// Add book
function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, read);
  myLibrary.unshift(book);
}

// Remove book
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// Toggle read
function toggleRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
  }
}

// Render function (CORE)
function renderBooks() {
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    const bookTextContainer = document.createElement('div');
    const bookBtnsContainer = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundColor = book.color;
    bookTextContainer.classList.add('book-text');
    bookBtnsContainer.classList.add('book-btns');

    const titleInfo = document.createElement('p');
    const authorInfo = document.createElement('p');
    const pageInfo = document.createElement('p');
    const status = document.createElement('p');

    titleInfo.classList.add('title-info');
    authorInfo.classList.add('author-info');
    pageInfo.classList.add('page-info');

    titleInfo.textContent = book.title;
    authorInfo.textContent = `by ${book.author}`;
    pageInfo.textContent = book.pages;

    status.textContent = book.read ? 'Read' : 'Not Read';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      removeBook(book.id);
      renderBooks();
    });

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Read';
    toggleBtn.addEventListener('click', () => {
      toggleRead(book.id);
      renderBooks();
    });

    deleteBtn.classList.add('delete-btn');
    toggleBtn.classList.add('checked-btn');
    bookTextContainer.appendChild(titleInfo);
    bookTextContainer.appendChild(authorInfo);
    bookTextContainer.appendChild(pageInfo);
    bookTextContainer.appendChild(status);
    bookBtnsContainer.appendChild(deleteBtn);
    bookBtnsContainer.appendChild(toggleBtn);
    card.appendChild(bookTextContainer);
    card.appendChild(bookBtnsContainer);

    container.appendChild(card);
  });
}

function closeDialog() {
  dialog.close();
}

function openDialog() {
  dialog.showModal();
}

addBtn.addEventListener('click', openDialog);
closeBtn.addEventListener('click', closeDialog);

// Submit event

function handleSubmit() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pageInput.value);
  const read = statusInput.checked;

  if (!title || !author || !pages) return;

  addBookToLibrary(title, author, pages, read);

  renderBooks();
  closeDialog(); //  close the dialog after submission

  // clear inputs
  titleInput.value = '';
  authorInput.value = '';
  pageInput.value = '';
  statusInput.checked = false;
}

submitBtn.addEventListener('click', handleSubmit);

dialog.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleSubmit();
  }
});

dialog.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeDialog();
  }
});

//  Pressing 'Enter' will move the focus to the next input.

form.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const currentInput = event.target;

    if (currentInput.tagName === 'INPUT' && currentInput.value.trim() !== '') {
      e.preventDefault();

      const inputs = Array.from(form.querySelectorAll('input'));
      const currentIndex = inputs.indexOf(currentInput);
      const nextInput = inputs[currentIndex + 1];

      if (nextInput) {
        nextInput.focus();
      }
    }
  }
});
