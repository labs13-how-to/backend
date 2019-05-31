const router = require("express").Router();

const db = require('./user-model.js');

//Get All Users
router.get("/", (req, res) => {
    db.getAllUsers()
        .then(users => {
            if(users.length > 0) {
                res.status(200).json(users)
            } else {
                res.status(404).json({message: "There are no registered users."})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

//Get Specific User By ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    
    db.getUserById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The specified user does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});