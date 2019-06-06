const router = require("express").Router();

const db = require('./comments-model.js');

module.exports = router;

router.get('/comments/users/:userId', getByUser);
router.get('/posts/:postId/comments', getByPost);
router.post('/posts/:postId/comments', add);
router.get('/comments/users/:userId/posts/:postId', getIds);
router.get('/comments/:id', getCommentId);
router.delete('/comments/:id', remove);
router.put('/comments/:id', update);


//functions
function getByUser(req, res) {
    const id = req.params.userId;
    db.getByUser(id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getByPost(req, res) {
    const id = req.params.postId;
    db.getByPost(id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getCommentId(req, res) {
    const id = req.params.id;
    db.getId(id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getIds(req, res) {
    const { userId, postId } = req.params;
    db.getById(userId, postId)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })


}

function add(req, res) {
    const { postId } = req.params;
    const info = { ...req.body, post_id: postId };
    db.addNew(info)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => res.status(405).json({ err, msg: err.message }));
}

function remove(req, res) {
    const { id } = req.params;
    db.remove(id)
        .then(comment => {
            if (comment) {
                res.status(200).json({ message: "The comment has been successfully deleted." })
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        });
}

function update(req, res) {
    const { id } = req.params;
    const changes = req.body.comment;
    db.update(id, { comment: changes })
        .then(changes => {
            if (changes) {
                res.status(200).json({ message: "This comment has been successfully updated." })
            } else {
                res.status(404).json({ message: "The specified comment does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}