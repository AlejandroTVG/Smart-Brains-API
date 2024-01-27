function handleRegister(req, res, bcrypt, db) {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("Unable to join!", err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

module.exports = {
  handleRegister: handleRegister,
};
