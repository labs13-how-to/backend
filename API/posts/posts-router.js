const router = require("express").Router();

const db = require("./posts-model.js");

//Get All Posts.
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
router.get("/:id", async (req, res) => {
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

//Create New Post.
router.post("/", (req, res) => {
    const newPost = req.body;

    if(!newPost.title && !newPost.description && !newPost.difficulty && !newPost.duration) {
        res.status(400).json({ message: "Please provide a title, description, difficulty and duration for this post."})
    } else {
        db.createPost(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    };
});

//Delete A Post.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.removePost(id)
    .then(post => {
        if(post) {
            res.status(200).json({ message: "The post has been successfully deleted."})
        } else {
            res.status(404).json({ message: "The specified post does not exist."})
        } 
    })
    .catch(err => {
        res.status(500).json(err.message)
    });
});

//Update a Post.
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.updatePost(id, changes)
    .then(changes => {
        if(changes) {
            res.status(200).json({ message: "This post has been successfully updated."})
        } else {
            res.status(404).json({ message: "The specified exercise does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

module.exports = router;