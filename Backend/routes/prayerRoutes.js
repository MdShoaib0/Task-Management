const express = require('express');
const router = express.Router();
const Prayer = require('../models/Prayer');

// Common helper function to avoid duplicate code
const handlePrayer = (prayerName) => {
  // GET
  router.get(`/${prayerName}`, async (req, res) => {
    try {
      const latestPrayer = await Prayer.findOne({ name: prayerName }).sort({ createdAt: -1 });
      if (!latestPrayer) {
        return res.status(404).json({ error: `No ${prayerName} prayer found` });
      }
      res.status(200).json(latestPrayer);
    } catch (error) {
      res.status(500).json({ error: `Error fetching ${prayerName} prayer` });
    }
  });

  // POST
  router.post(`/${prayerName}`, async (req, res) => {
    try {
      const { name, day, month, year } = req.body;
      if (!name || day === undefined || month === undefined || year === undefined) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const exists = await Prayer.findOne({ name: prayerName });
      if (exists) {
        return res.status(400).json({ error: `${prayerName} prayer already exists` });
      }

      const prayer = new Prayer({ name, day, month, year });
      const savedPrayer = await prayer.save();
      res.status(201).json(savedPrayer);
    } catch (error) {
      res.status(500).json({ error: `Error creating ${prayerName} prayer` });
    }
  });

  // PUT
  router.put(`/${prayerName}`, async (req, res) => {
    try {
      const { name, day, month, year } = req.body;
      if (!name || day === undefined || month === undefined || year === undefined) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const updatedPrayer = await Prayer.findOneAndUpdate(
        { name: prayerName },
        { $set: { day, month, year } },
        { new: true }
      );

      if (!updatedPrayer) {
        return res.status(404).json({ error: `${prayerName} prayer not found to update` });
      }

      res.status(200).json(updatedPrayer);
    } catch (error) {
      res.status(500).json({ error: `Error updating ${prayerName} prayer` });
    }
  });
};

// Register routes for all 5 prayers
['Fazar', 'Dhuar', 'Ashar', 'Magrib', 'Esha'].forEach(handlePrayer);

module.exports = router;