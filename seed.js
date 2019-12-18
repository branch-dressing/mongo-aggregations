require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const { seedData } = require('./lib/utils/seed-data');

seedData()
  // eslint-disable-next-line no-console
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
