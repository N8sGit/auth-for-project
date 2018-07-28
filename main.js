const router = require('express').Router()
//const {User} = require('../db/models')
let Main = router 
Main.get('/main', (req, res, next) => {
   
    console.log('router hit');
    app.post('/main' , function(req,res){
        console.log('main server route entered');
        res.send('hello there ;)').then(function (information){
            res.send({message: 'this is to seei inside the main.get server response', information})
        })
    }) 
//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ['id', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
})
module.exports = Main