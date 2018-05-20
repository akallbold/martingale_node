const Sequelize = require('sequelize')
console.log('heyy main index in models')
const db = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost:5432/martingale', {
      logging: false
    }
)
module.exports = db
