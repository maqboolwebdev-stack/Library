const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const pageInput = document.querySelector('.page');
const statusInput = document.querySelector('.status');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.books-container');

const myLibrary = [];

// Constructor
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method (toggle read)
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// Add book
function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}

// Remove book
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

// Toggle read
function toggleRead(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleRead();
    }
}

// Render function (CORE)
function renderBooks() {
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');

        const info = document.createElement('p');
        info.textContent = `${book.title} | ${book.author} | ${book.pages} pages | ${book.read ? 'Read' : 'Not Read'}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeBook(book.id);
            renderBooks();
        });

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Read';
        toggleBtn.addEventListener('click', () => {
            toggleRead(book.id);
            renderBooks();
        });

        card.appendChild(info);
        card.appendChild(deleteBtn);
        card.appendChild(toggleBtn);

        container.appendChild(card);
    });
}

// Submit event
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = Number(pageInput.value);
    const read = statusInput.checked;

    if (!title || !author || !pages) return;

    addBookToLibrary(title, author, pages, read);

    renderBooks();

    // clear inputs
    titleInput.value = '';
    authorInput.value = '';
    pageInput.value = '';
    statusInput.checked = false;
});