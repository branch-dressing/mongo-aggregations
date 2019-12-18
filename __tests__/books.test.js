require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;
  const date = new Date();
  beforeEach(async() => {
    book = await Book.create({
      title: 'New Book',
      author: 'Durham, Joel',
      myRating: 5,
      avgRating: 4.2,
      binding: 'Hardback',
      pages: 302,
      publicationYear: date,
      dateRead: date
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new book', () => {
    return request(app)
      .post('/api/v1/books')
      .send({
        title: 'New Book',
        author: 'Durham, Joel',
        myRating: 5,
        avgRating: 4.2,
        binding: 'Hardback',
        pages: 302,
        publicationYear: date,
        dateRead: date
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'New Book',
          author: 'Durham, Joel',
          myRating: 5,
          avgRating: 4.2,
          binding: 'Hardback',
          pages: 302,
          publicationYear: date.toISOString(),
          dateRead: date.toISOString()
        });
      });
  });

  it('gets all books', async() => {
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          __v: 0,
          title: 'New Book',
          author: 'Durham, Joel',
          myRating: 5,
          avgRating: 4.2,
          binding: 'Hardback',
          pages: 302,
          publicationYear: date.toISOString(),
          dateRead: date.toISOString()
        }]);
      });
  });

  it('can update a book', async() => {
    return request(app)
      .patch(`/api/v1/books/${book._id}`)
      .send({ title: 'Untitled Memoir', pages: 556 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'Untitled Memoir',
          author: 'Durham, Joel',
          myRating: 5,
          avgRating: 4.2,
          binding: 'Hardback',
          pages: 556,
          publicationYear: date.toISOString(),
          dateRead: date.toISOString()
        });
      });
  });

  it('can get a single book', async() => {
    return request(app)
      .get(`api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'New Book',
          author: 'Durham, Joel',
          myRating: 5,
          avgRating: 4.2,
          binding: 'Hardback',
          pages: 302,
          publicationYear: date.toISOString(),
          dateRead: date.toISOString()
        });
      });
  });

  it('can delete a book', async() => {
    return request(app)
      .del(`api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'New Book',
          author: 'Durham, Joel',
          myRating: 5,
          avgRating: 4.2,
          binding: 'Hardback',
          pages: 302,
          publicationYear: date.toISOString(),
          dateRead: date.toISOString()
        });
      });
  });
});
