const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const birdSchema = new Schema({
  birdName: { type: String, required: true },
  nickname: { type: String, required: false },
  date: { type: Date, required: true },
  birdLat: { type: String, required: true },
  birdLon: { type: String, required: true },
}, {
  timestamps: true,
});

const Bird = mongoose.model('Bird', birdsSchema);

module.exports = Bird;