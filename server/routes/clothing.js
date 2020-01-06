const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {

    fs.readFile(datafile, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        let clothingData = JSON.parse(data);
        console.log('Returning clothing data');
        res.send(clothingData);
      }
    });
    console.log('Doing more work');
  });

module.exports = router;
