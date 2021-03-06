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
router.get("/:id", (req, res) => {
    const id = req.params.id;
    
    db.getPostById(id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The specified post does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

// Get steps specific to a post
router.get("/:id/steps", (req, res) => {
    const {id} = req.params;

    db.getStepsByPostId(id)
        .then(steps => {
            if(!steps) {
                res.status(400).json({ message: "The specified post does not exist." })
            } else if(steps.length) {
                res.status(200).json(steps);
            } else {
                res.status(404).json({ message: "No steps exist for the specified post." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

//Create New Post.
router.post("/", (req, res) => {
    const newPost = req.body;

    if(!newPost.title || !newPost.description || !newPost.difficulty || !newPost.duration) {
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

// Add a tag to a post
router.post("/:id/tags", (req, res) => {
    const {id} = req.params;
    const {tag_id} = req.body;

    if(!tag_id) {
        res.status(400).json({ message: "Please provide the tag_id for the tag you wish to add to this post."})
    } else {
        db.addPostTag(id, tag_id)
            .then(post_tag => {
                res.status(201).json(post_tag);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
})

// Add a step to a post
router.post("/:id/steps", (req, res) => {
    const {id} = req.params;
    const step = req.body;

    if(!step.step_num || !step.title || !step.instruction) {
        res.status(400).json({ message: "Please provide the step_num, title, and instruction for the step you wish to add to this post."})
    } else {
        db.addPostStep(id, step)
            .then(post_step => {
                res.status(201).json(post_step);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
})

//Delete A Post.
router.delete("/:id", (req, res) => {
    const {id} = req.params;

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

// Remove a tag from a post
router.delete("/:id/tags/:tag_id", (req, res) => {
    const {id, tag_id} = req.params;
    db.removePostTag(id, tag_id)
        .then(count => {
            if(count) {
                res.status(200).json({ message: "The tag has been successfully removed from the post." })
            } else {
                res.status(404).json({ message: "The specified tag does not exist on this post." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

// Delete a step
router.delete("/:id/steps/:step_id", (req, res) => {
    const {step_id} = req.params;
    db.removePostStep(step_id)
        .then(count => {
            if(count) {
                res.status(200).json({ message: "The step has been successfully deleted." })
            } else {
                res.status(404).json({ message: "The specified step does not exist in our database." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

//Update a Post.
router.put("/:id", (req, res) => {
    const {id} = req.params;
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

// Update which tag is mapped to a post
router.put("/:id/tags/:tag_id", (req, res) => {
    const {id, tag_id} = req.params;
    const changes = req.body;
    db.updatePostTag(id, tag_id, changes)
        .then(changes => {
            if(changes) {
                res.status(200).json({ message: "This tag has been successfully updated on this post." })
            } else {
                res.status(404).json({ message: "The specified tag does not exist on this post." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

// Update a step on a post
router.put("/:id/steps/:step_id", (req, res) => {
    const {id, step_id} = req.params;
    const changes = req.body;
    db.updatePostStep(step_id, changes)
        .then(changes => {
            if(changes) {
                res.status(200).json({ message: "This step has been successfully updated." })
            } else {
                res.status(404).json({ message: "The specified step does not exist in our database." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
})

module.exports = router;