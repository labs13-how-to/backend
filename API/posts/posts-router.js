const router = require("express").Router();

const db = require("./posts-model.js");

//Get All Posts
router.get("/", (req, res) => {
    db.getAllPosts()
        .then(posts => {
            if(posts.length > 0) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({message: "There are no available posts."})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

//Get Specified Post by ID.
router.get("/:id", (req, res) => {
    const id = req.params.id;
    
    db.getPostById(id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The specified post does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

module.exports = router;