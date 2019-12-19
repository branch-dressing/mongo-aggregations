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

schema.statics.getMostPagesReadByAuthors = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$author', 
        'pages': {
          '$sum': '$pages'
        }
      }
    }, {
      '$sort': {
        'pages': -1
      }
    }, {
      '$limit': 10
    }
  ]);
};

schema.statics.getControversy = function(opinion) {
  let order;
  if(opinion === 'loved') order = -1;
  if(opinion === 'hated') order = 1;
  return this.aggregate([
    {
      '$addFields': {
        'ratingDiff': {
          '$subtract': [
            '$myRating', '$avgRating'
          ]
        }
      }
    }, {
      '$match': {
        'myRating': {
          '$gt': 0
        }
      }
    }, {
      '$sort': {
        'ratingDiff': order
      }
    }, {
      '$limit': 10
    }
  ]);
};

schema.statics.getAvgPagesBasedOnBinding = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$binding', 
        'totalBooks': {
          '$sum': 1
        }, 
        'totalPages': {
          '$sum': '$pages'
        }
      }
    }, {
      '$addFields': {
        'avgPages': {
          '$divide': [
            '$totalPages', '$totalBooks'
          ]
        }
      }
    }, {
      '$sort': {
        'avgPages': -1
      }
    }
  ]);
};



module.exports = mongoose.model('Book', schema);
