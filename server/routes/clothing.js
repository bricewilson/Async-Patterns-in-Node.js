const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get(async function(req, res) {

    try {
      let data = await getClothingData();
      res.send(data);
    }
    catch (error) {
      res.status(500).send(error);
    }
  })

  .post(async function(req, res) {
    try {

      let data = await getClothingData();

      let nextID = getNextAvailableID(data);

      let newClothingItem = {
          clothingID: nextID,
          itemName: req.body.itemName,
          price: req.body.price
      };

      data.push(newClothingItem);

      await saveClothingData(data);

      res.status(201).send(newClothingItem);
    }
    catch (error) {
      res.status(500).send(error);
    }

  });

async function getClothingData() {

  let rawData = await fsPromises.readFile(datafile, 'utf8');
  let clothingData = JSON.parse(rawData);

  return clothingData;

}  

function getNextAvailableID(allClothingData) {
  
  let maxID = 0;

  allClothingData.forEach(function(element, index, array) {
    if(element.clothingID > maxID) {
        maxID = element.clothingID;
    }
  });
  return ++maxID;
}

function saveClothingData(data) {
  return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
}

module.exports = router;
