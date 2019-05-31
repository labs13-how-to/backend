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

module.exports = router;