var express = require('express');
var router = express.Router();
const {Spin} = require('../db/models')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  req.body.currentGameSpins.map(spin => {
    let newSpin = Spin.create({
      gameId: req.body.gameId,
      spinNum: spin[0].spin,
      spinNumResult: spin[0].resultNum,
      spinColResult: spin[0].resultCol,
      win: spin[0].spinWin,
      currentBet: spin[0].currentBet,
      pocket: spin[0].pocket
    })
  })
});

module.exports = router;
