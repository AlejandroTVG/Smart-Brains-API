const handleImage = (db) => (req, res) => {
  const { email } = req.body;
  db("users")
    .where({ email })
    .increment({ entries: 1 })
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Error getting entries!"));
};

module.exports = {
  handleImage: handleImage,
};
