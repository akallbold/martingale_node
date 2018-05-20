const Sequelize = require('sequelize')
const db = require('../db')
// const Spin = require('./spin')
console.log('heyy game model')
// Spin.belongsTo(Game);
module.exports = db.define('game', {
  bet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  win: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  numOfSpins: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  goal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  maxInvestment: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  colorChoice: {
    type: Sequelize.STRING,
    allowNull: false
  },
  highestBet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  probOfWin: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})
