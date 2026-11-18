const STORAGE_KEY = 'myLibrary';

function isStoredBook(book) {
  return (
    book !== null &&
    typeof book === 'object' &&
    typeof book.id === 'string' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string' &&
    Number.isFinite(book.pages) &&
    book.pages > 0 &&
    typeof book.read === 'boolean' &&
    typeof book.color === 'string'
  );
}

function loadBooks() {
  const savedBooks = localStorage.getItem(STORAGE_KEY);

  if (savedBooks === null) {
    return null;
  }

  let books;
  try {
    books = JSON.parse(savedBooks);
  } catch (error) {
    throw new Error('Could not parse the saved library data.', { cause: error });
  }

  if (!Array.isArray(books) || !books.every(isStoredBook)) {
    throw new Error('The saved library data has an invalid format.');
  }

  return books;
}

function saveBooks(books) {
  const booksToSave = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.read,
    color: book.color,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(booksToSave));
}

export { loadBooks, saveBooks };
