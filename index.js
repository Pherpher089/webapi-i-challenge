const express = require('express');
const db = require('./data/db')

server = express();

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

server.listen(8000, ()=> console.log('API running on port 8000'))

