const router = require("express").Router();

const db = require('./favorites-model.js');

module.exports = router;

router.get('/favorites/users/:userId', getByUser);
router.get('/posts/:postId/favorites', getByPost);
router.post('/posts/:postId/favorites', add);
router.get('/favorites/users/:userId/posts/:postId', getIds);
router.get('/favorites/:id', getFavoriteId);
router.delete('/favorites/:id', remove);


//functions
function getByUser(req, res) {
    const id = req.params.userId;
    db.getByUser(id)
        .then(favorite => {
            if (favorite) {
                res.status(200).json(favorite)
            } else {
                res.status(404).json({ message: "The specified favorite does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getByPost(req, res) {
    const id = req.params.postId;
    db.getByPost(id)
        .then(favorite => {
            if (favorite) {
                res.status(200).json(favorite)
            } else {
                res.status(404).json({ message: "The specified favorite does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getFavoriteId(req, res) {
    const id = req.params.id;
    db.getId(id)
        .then(favorite => {
            if (favorite) {
                res.status(200).json(favorite)
            } else {
                res.status(404).json({ message: "The specified favorite does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function getIds(req, res) {
    const { userId, postId } = req.params;
    db.getById(userId, postId)
        .then(favorite => {
            if (favorite) {
                res.status(200).json(favorite)
            } else {
                res.status(404).json({ message: "The specified favorite does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })


}

function add(req, res) {
    const { postId } = req.params;
    const info = { user_id: req.body.user_id, post_id: postId };
    db.addNew(info)
        .then((res) => {
            return res.status(200).json(res)
        })
        .catch(err => { res.status(405).json({ err }) });
}

function remove(req, res) {
    const { id } = req.params;
    db.remove(id)
        .then(favorite => {
            if (favorite) {
                res.status(200).json({ message: "The favorite has been successfully deleted." })
            } else {
                res.status(404).json({ message: "The specified favorite does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        });
}