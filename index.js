const express = require('express');
const db = require('./data/db')

server = express();
server.use(express.json())

server.get('/api/users', (req, res) =>{
    db.find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err)) 
})

server.get('/api/user/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})


server.post('/api/users/', (req, res) =>{
    const {name, bio} = req.body;

    if(!name){
        res.status(400)
        .json({errorMessage: 'please provide a name for the user'})
    } else if(!bio){
        res.status(400)
        .json('please provide a bio for the user')
    } else {
        db.insert(req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({errorMessage: `There was an error while trying to add ${req.body.name} to the data base`});
        })
    }

})

server.listen(8000, ()=> console.log('API running on port 8000'))

