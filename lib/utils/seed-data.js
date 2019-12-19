const csv = require('csvtojson');
const Book = require('../models/Book');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../csv/goodreads_library_export.csv')
    .then(books => {
      return books.map(book => ({
        title: book.Title,
        author: book['Author l-f'],
        myRating: book['My Rating'],
        avgRating: book['Average Rating'],
        binding: book.Binding,
        pages: book['Number of Pages'],
        publicationYear: book['Year Published'],
        dateRead: book['Date Read']
      }));
    })
    .then(books => Book.create(books));
}

module.exports = {
  seedData
};
