const router = require("express").Router();

const db = require('./favorites-model.js');

module.exports = router;

router.get('/favorites/users/:userId', getByUser);
router.post('/posts/:postId/favorite', add);
router.get('/favorites/users/:userId/posts/:postId', getId);


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

function getId(req, res) {
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