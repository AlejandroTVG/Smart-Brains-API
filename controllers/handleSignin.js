function handleSignin(req, res, db, bcrypt) {
  db.select("*")
    .from("login")
    .where("email", "=", req.body.email)
    .then((user) => {
      const isValid = bcrypt.compareSync(req.body.password, user[0].hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Error getting user!"));
      } else {
        res.status(400).json("Wrong Credentials");
      }
    });
}

module.exports = {
  handleSignin: handleSignin,
};
