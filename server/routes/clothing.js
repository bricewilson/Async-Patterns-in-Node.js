const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {

    let rawData = fs.readFileSync(datafile, 'utf8');
    let clothingData = JSON.parse(rawData);

    res.send(clothingData);

  });

module.exports = router;
