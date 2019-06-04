const router = require("express").Router();

const db = require("./tags-model.js");

//Get All Tags.
router.get("/", (req, res) => {
  db.getAllTags()
    .then(tags => {
      if (tags.length > 0) {
        res.status(200).json(tags);
      } else {
        res.status(404).json({ message: "There are no available tags." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Create New Tag.
router.post("/", (req, res) => {
  const newTag = req.body;

  if (!newTag.name) {
    res.status(400).json({
      message: "Please provide a tag name"
    });
  } else {
    db.addNew(newTag)
      .then(tag => {
        res.status(201).json(tag);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

//Delete A Tag.
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(tag => {
      if (tag) {
        res
          .status(200)
          .json({ message: "The tag has been successfully deleted." });
      } else {
        res.status(404).json({ message: "The specified tag does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Update a Tag.
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes)
    .then(changes => {
      if (changes) {
        res
          .status(200)
          .json({ message: "This tag has been successfully updated." });
      } else {
        res.status(404).json({ message: "The specified tag does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
