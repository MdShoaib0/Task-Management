const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  
  day: {
    type: Number,
    required: true
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Prayer', prayerSchema);