const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    typd: String,
    required: true
  },
  author: {
    typd: String,
    required: true
  },
  myRating: {
    typd: Number,
    required: true
  },
  avgRating: {
    typd: Number,
    required: true
  },
  binding: String,
  pages: {
    typd: Number,
    required: true
  },
  publicationYear: Date,
  dateRead: Date,
});

module.exports = mongoose.model('Book', schema);
