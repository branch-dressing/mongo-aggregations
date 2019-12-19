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

  .get('/toppages', (req, res, next) => {
    Book
      .getMostPagesReadByAuthors()
      .then(mostReadAuthors => res.send(mostReadAuthors))
      .catch(next);
  })

  .get('/controversy', (req, res, next) => {
    const { opinion = 'loved' } = req.query;
    Book
      .getControversy(opinion)
      .then(differentOpinions => res.send(differentOpinions))
      .catch(next);
  })

  .get('/binding', (req, res, next) => {
    Book
      .getAvgPagesBasedOnBinding()
      .then(avgPages => res.send(avgPages))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Book
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(book => res.send(book))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Book
      .findById(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Book
      .findByIdAndDelete(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  });
