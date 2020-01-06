const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(function(req, res) {

    getClothingData((err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Returning clothing data');
        res.send(data);
      }
    });

    console.log('Doing more work');
  });

function getClothingData(callback) {
  fs.readFile(datafile, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    }
    else {
      let clothingData = JSON.parse(data);
      callback(null, clothingData);
    }
  });
}  

module.exports = router;
