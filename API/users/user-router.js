const router = require("express").Router();

const db = require("./user-model.js");

//Get All Users
router.get("/", (req, res) => {
  db.getAllUsers()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "There are no registered users." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Get Specific User By ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getUserById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The specified user does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Get all of the user's posts by ID
router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await db.getUserPosts(req.params.id);
    console.log(posts.length);
    if (posts.length < 1) {
      res.status(404).json({ message: "This user has no posts" });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting the posts for the user"
    });
  }
});

//Update User Info
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.updateUser(id, changes)
    .then(changes => {
      if (changes) {
        res.status(200).json({ message: "User successfully updated." });
      } else {
        res.status(404).json({ message: "The specified user does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Delete User
router.delete("/:id", async (req, res) => {
  try {
    const count = await db.deleteUser(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The user has been deleted" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the user"
    });
  }
});

module.exports = router;
