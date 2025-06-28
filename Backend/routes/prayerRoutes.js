const express = require('express');
const router = express.Router();
const Prayer = require('../models/Prayer');

router.get('/', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.status(200).json(prayers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, day } = req.body;

  try {
    let existing = await Prayer.findOne({ name });
    if (existing) {
      existing.day = day;
      await existing.save();
      res.status(200).json(existing);
    } else {
      const newPrayer = new Prayer({ name, day });
      await newPrayer.save();
      res.status(201).json(newPrayer);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;