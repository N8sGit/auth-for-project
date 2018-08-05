// const Main = require('express').Router()
// //const {User} = require('../db/models')
// // const MainController = require('./controllers/main_controller')
// //console.log(MainController,'Main controler at main.js router')

// Main.get('/', (req, res, next) => {
//     Main.get('/', (req, res, next) => {
//         User.findAll({
//           // explicitly select only the id and email fields - even though
//           // users' passwords are encrypted, it won't help if we just
//           // send everything to anyone who asks!
//           attributes: ['id', 'email']
//         })
//           .then(users => res.json(users))
//           .catch(next)
//       })
// }) 
// //   User.findAll({
// //     // explicitly select only the id and email fields - even though
// //     // users' passwords are encrypted, it won't help if we just
// //     // send everything to anyone who asks!
// //     attributes: ['id', 'email']
// //   })
// //     .then(users => res.json(users))
// //     .catch(next)
// module.exports = Main

