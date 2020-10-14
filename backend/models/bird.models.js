const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const birdSchema = new Schema({
  birdname: { type: String, required: true },
  nickname: { type: String, required: false },
  date: { type: Date, required: true },
  birdlat: { type: Number, required: true },
  birdlon: { type: Number, required: true },
}, {
  timestamps: true,
});

const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;