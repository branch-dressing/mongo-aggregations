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

  // beforeEach(async() => {
  //   book = await Book.create
  // });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new book', () => {
    const date = new Date();
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
});
