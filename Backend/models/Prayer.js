const mongoose = require("mongoose");

const prayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day: { type: Number, required: true },
  month: { type: Number, default: 0 },
  year: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Prayer", prayerSchema);