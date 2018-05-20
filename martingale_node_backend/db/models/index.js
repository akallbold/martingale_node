const Game = require("./game")
const Spin = require('./spin')
console.log('heyy index in models')

Spin.belongsTo(Game);
module.exports = {
  Game,
  Spin
}
