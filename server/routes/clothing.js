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
      console.log('Returning async data.');
      res.send(data);
    }
    catch (error) {
      res.status(500).send(error);
    }

    // getClothingData()
    //   .then(data => {
    //     console.log('Returning clothing data to browser.');
    //     res.send(data);
    //   })
    //   .catch(error => res.status(500).send(error))
    //   .finally(() => console.log('All done processing promise.'));

  });

async function getClothingData() {

  let rawData = await fsPromises.readFile(datafile, 'utf8');
  let clothingData = JSON.parse(rawData);

  console.log(clothingData);

  return clothingData;

  // return new Promise((resolve, reject) => {
  //   fs.readFile(datafile, 'utf8', (err, data) => {
  //     if (err) {
  //       reject(err);
  //     }
  //     else {
  //       let clothingData = JSON.parse(data);
  //       resolve(clothingData);
  //     }
  //   });
  // });

}  

module.exports = router;
