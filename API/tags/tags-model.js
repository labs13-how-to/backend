const db = require("../../data/dbConfig.js");

module.exports = {
  getAllTags,
  addNew,
  update,
  remove
};

function getAllTags() {
  return db("tags");
}

function addNew(tag) {
  return db("tags")
    .insert(tag, "id")
    .then(([id]) => {
      return getTagsById(id);
    });
}

function remove(id) {
  return db("tags")
    .where({ id })
    .first()
    .del();
}

function update(id, changes) {
  return db("tags")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getTagsById(id);
      } else {
        return null;
      }
    });
}
