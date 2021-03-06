var express = require('express');
var router = express.Router();
const {Game} = require('../db/models')

router.get('/', function(req, res, next) {
  Game.all()
  .then(result => res.json(result))
});

router.post('/', function(req, res, next) {
  Game.create({
    bet:req.body.bet,
    win: req.body.gameWin,
    numOfSpins: req.body.numOfSpins,
    goal: req.body.goal,
    maxInvestment: req.body.maxInvestment,
    colorChoice: req.body.colorChoice,
    highestBet: req.body.highestBet,
    probOfWin: req.body.probOfWin})
  .then(game => {
    res.send(game)
  })
  .catch(next)
});

module.exports = router;
