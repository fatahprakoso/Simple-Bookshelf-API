const { nanoid } = require('nanoid');

const bookShelf = [];

bookShelf.filterBooks = ({ name, reading, finished }) => {
  let books = [];

  if (name || reading || finished) {
    if (name) {
      books = bookShelf.filter(book => book.name.toUpperCase().includes(name.toUpperCase()));
    }

    if (reading) {
      reading = Boolean(Number(reading));

      if (books[0]) {
        books = books.filter(book => book.reading === reading);
      } else {
        books = bookShelf.filter(book => book.reading === reading);
      }
    }

    if (finished) {
      finished = Boolean(Number(finished));

      if (books[0]) {
        books = books.filter(book => book.finished === finished);
      } else {
        books = bookShelf.filter(book => book.finished === finished);
      }
    }
  } else {
    books = bookShelf;
  }

  books = books.map(book => {
    const { id, name, publisher } = book;
    return { id: id, name: name, publisher: publisher };
  });

  return books;
};

bookShelf.pushBook = ({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
  id
}) => {
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  if (!id) {
    const insertedAt = updatedAt;
    id = nanoid(16);

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    };

    bookShelf.push(newBook);

    if (bookShelf.some(book => book === newBook)) return id;
  } else {
    const bookIndex = bookShelf.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
      const book = {
        ...bookShelf[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
        finished
      };

      bookShelf[bookIndex] = book;
      return true;
    }
    return false;
  }
};

bookShelf.removeBook = bookId => {
  const bookIndex = bookShelf.findIndex(book => book.id === bookId);
  bookShelf.splice(bookIndex, 1);
  return bookIndex;
};

module.exports = bookShelf;
