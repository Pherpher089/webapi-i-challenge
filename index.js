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

server.get('/api/users/:id', (req, res) => {
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

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    if(!userId){
        res.status(404).json({Message: 'The user with the specified ID does not exist'})
    } else {
        db.remove(req.params.id)
        .then(count =>{
            if(count && count > 0){
                res.status(200).json({message: 'The user has been successfully deleted.'})
            }
        })
        .catch(err =>{
            res.status(500).jsaon({error: 'The user could not be removed'})
        })
    }
   
})

server.put('/api/users/:id', (req, res) =>{
    if(!db.findById(req.params.id)) {
        res.status(404).json({message: "The user with the specifid ID does not exist"})
    } else if(!req.body.name || !req.body.bio){
        res.status(400).json({errorMessage: "Please provide a name and bio for the user."})
    } else {
        db.update(req.params.id, req.body)
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({errorMessage: "The user information could not be modified"})
        })
    }
})

server.listen(8000, ()=> console.log('API running on port 8000'))

