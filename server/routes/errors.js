var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET all books and POST new readers */
router.route('/500')
    .get(function(req, res) {
        res.status(500).send('Book Tracker server error.');
    });

router.route('/401')
    .get(function(req, res) {
        res.status(401).send('Book Tracker unauthorized.');
    });

module.exports = router;