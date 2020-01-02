const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing and POST new clothing */
router.route('/')
  .get(function(req, res) {

    let rawData = fs.readFileSync(datafile, 'utf8');
    let clothingData = JSON.parse(rawData);

    res.send(clothingData);

  })

  .post(function(req, res) {

    let data = getClothingData();
    let nextID = getNextAvailableID(data);

    let newClothing = {
      clothingID: nextID,
      itemName: req.body.itemName,
      price: req.body.price
    };

    data.push(newClothing);

    saveClothing(data);

    res.set('Content-Type', 'application/json');
    res.status(201).send(newClothing);
  });

function saveClothing(data) {
  fs.writeFile(datafile, JSON.stringify(data, null, 4), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function getNextAvailableID(allClothing) {

  let maxID = 0;

  allClothing.forEach(function(element, index, array) {
    if(element.clothingID > maxID) {
      maxID = element.clothingID;
    }
  });
  return ++maxID;
}

module.exports = router;
