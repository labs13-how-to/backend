const router = require("express").Router();

const db = require('./review-model.js');

module.exports = router;

router.get('/:id/reviews', get);
router.get('/reviews/:uId', getUserReviews);
router.post('/:id/reviews', add)

//functions
function get(req, res) {
    const id = req.params.id;
    db.get(id)
        .then(review => {
            if (review) {
                res.status(200).json(review)
            } else {
                res.status(404).json({ message: "The specified review does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })


}

function getUserReviews(req, res) {
    const { uId } = req.params;

    db.getByUser(uId)
        .then(review => {
            if (review) {
                res.status(200).json(review)
            } else {
                res.status(404).json({ message: "The specified review does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })


}

function add(req, res) {
    const id = req.params.id;
    const info = req.body;

    db.addNew(info)
        .then(() => {
            db.get(id)
                .then(reviews => {
                    if (reviews) {
                        const rev = reviews[reviews.length - 1];
                        res.status(200).json(rev)
                    } else {
                        res.status(404).json({ message: "The specified review does not exist." })
                    }
                })
        })
        .catch(err => { res.status(405).json({ err }) });
}