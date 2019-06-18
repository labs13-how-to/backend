const router = require("express").Router();

const db = require("./review-model.js");

module.exports = router;

router.get("/:id/reviews", get);
router.post("/:id/reviews", add);

router.get("/reviews/:rId", getId);
router.delete("/reviews/:rId", remove);
router.put("/reviews/:rId", update);

router.get("/user/:uId/reviews", getUserReviews);

//functions
function get(req, res) {
  const id = req.params.id;
  db.get(id)
    .then(review => {
      if (review) {
        res.status(200).json(review);
      } else {
        res
          .status(404)
          .json({ message: "The specified review does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function getId(req, res) {
  const { id, rId } = req.params;
  db.getById(rId)
    .then(review => {
      if (review) {
        res.status(200).json(review);
      } else {
        res
          .status(404)
          .json({ message: "The specified review does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function getUserReviews(req, res) {
  const { uId } = req.params;

  db.getByUser(uId)
    .then(review => {
      if (review) {
        res.status(200).json(review);
      } else {
        res
          .status(404)
          .json({ message: "The specified review does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function add(req, res) {
  const id = req.params.id;
  const info = req.body;
  console.log("Req.Params.id", req.params.id);
  console.log("req.body", req.body);

  db.addNew(info)
    .then(() => {
      db.get(id).then(reviews => {
        if (reviews) {
          const rev = reviews[reviews.length - 1];
          res.status(200).json(rev);
        } else {
          res
            .status(404)
            .json({ message: "The specified review does not exist." });
        }
      });
    })
    .catch(err => {
      res.status(405).json({ err });
    });
}

function remove(req, res) {
  const { id, rId } = req.params;
  db.remove(rId)
    .then(review => {
      if (review) {
        res
          .status(200)
          .json({ message: "The review has been successfully deleted." });
      } else {
        res
          .status(404)
          .json({ message: "The specified review does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function update(req, res) {
  const id = req.params.rId;
  const changes = req.body;

  db.update(id, changes)
    .then(changes => {
      if (changes) {
        res
          .status(200)
          .json({ message: "This post has been successfully updated." });
      } else {
        res
          .status(404)
          .json({ message: "The specified exercise does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ err, msg: err.message });
    });
}
