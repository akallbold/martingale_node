const Sequelize = require('sequelize')
const db = require('../db')
// const Game = require('./game')
console.log('heyy spin model')

// Spin.belongsTo(Game);
module.exports = db.define('spin', {
  spinNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  spinNumResult: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  spinColResult: {
    type: Sequelize.STRING,
    allowNull: false
  },
  win: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  currentBet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pocket: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})
