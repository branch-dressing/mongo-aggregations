const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  myRating: {
    type: Number,
    required: true
  },
  avgRating: {
    type: Number,
    required: true
  },
  binding: String,
  pages: {
    type: Number,
    required: true
  },
  publicationYear: Date,
  dateRead: Date,
});

module.exports = mongoose.model('Book', schema);
