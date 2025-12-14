const form = document.querySelector('form');
const booksContainer = document.querySelector('.books');
const inputs = document.querySelectorAll('.input');

// RANDOM COLOR 
function getRandomColor() {
  const colors = [
    '#c78c18',
    '#8b0000',
    '#2e7d32',
    '#1565c0',
    '#6a1b9a',
    '#ef6c00',
    '#37474f'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// STATS
function updateStats() {
  const books = document.querySelectorAll('.book');
  const readBooks = document.querySelectorAll(
    '.book input[type="checkbox"]:checked'
  );

  document.getElementById('total').textContent = books.length;
  document.getElementById('read').textContent = readBooks.length;
  document.getElementById('unread').textContent =
    books.length - readBooks.length;
}

// DUPLICATE CHECK
function isDuplicate(title, author) {
  return [...document.querySelectorAll('.book')].some(book => {
    const t = book.querySelector('.book-title h2').textContent.trim();
    const a = book.querySelector('.book-author').textContent.trim();
    return t === title && a.includes(author);
  });
}

// INTERACTIVITY 
function makeBookInteractive(book) {
  const checkbox = book.querySelector('input[type="checkbox"]');
  const label = book.querySelector('.read-lable');
  const removeBtn = book.querySelector('.remove-btn');

  // assign color once
  book.style.backgroundColor = getRandomColor();

  label.style.color = '#ffffff';

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      label.firstChild.textContent = 'Complete: ';
      label.style.color = '#00ff9c';
    } else {
      label.firstChild.textContent = 'Not Read: ';
      label.style.color = '#ffffff';
    }
    updateStats();
  });

  removeBtn.addEventListener('click', () => {
    book.remove();
    updateStats();
  });
}

// EXISTING BOOKS
document.querySelectorAll('.book').forEach(makeBookInteractive);
updateStats();

// ADD NEW BOOK
form.addEventListener('submit', e => {
  e.preventDefault();

  const title = inputs[0].value.trim();
  const author = inputs[1].value.trim();
  const pages = inputs[2].value.trim();

  if (isDuplicate(title, author)) {
    alert('This book already exists');
    return;
  }

  const book = document.createElement('div');
  book.classList.add('book');

  book.innerHTML = `
    <div class="book-title">
      <h2>${title}</h2>
    </div>

    <div class="book-author">
      <h3><span>by</span> ${author}</h3>
    </div>

    <div class="book-page-book-status">
      <label class="read-lable">
        Not Read:
        <input type="checkbox">
      </label>
      <p>${pages}</p>
      <button class="remove-btn">Remove</button>
    </div>
  `;

  booksContainer.prepend(book);
  makeBookInteractive(book);
  updateStats();
  form.reset();
});
