const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(book => res.send(book))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Book
      .find()
      .select()
      .then(books => res.send(books))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Book
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(book => res.send(book));
  });
