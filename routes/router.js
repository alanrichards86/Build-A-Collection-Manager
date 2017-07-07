const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/partyBags');

router.get('/', function(req, res){
    Bags.find({}).then(function(bag){
    res.render('layout', {bags: bag })
  })
});

router.post('/postData', function(req, res){
  var newBag = new Bags({
    size: req.body.size,
    colors: req.body.colors
  });
  newBag.save().then(function(Bags){
    console.log();
    res.redirect('/')
  })
});


const partyBagsSchema = new Schema({
  size: {type: String, required: true},
  colors: [String],
  hasHandle: Boolean,
  timeOwned: Number,
  glitter: Boolean,
  worn:[{
    where: String,
    howBad: String,
    torn: Boolean,
    howManyTears: String

  }],
});

const Bags = mongoose.model('Bags', partyBagsSchema);





module.exports = router;
