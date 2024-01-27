const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const { handleSignin } = require("./controllers/handleSignin");
const { handleRegister } = require("./controllers/handleRegister");
const { handleProfile } = require("./controllers/handleProfile");
const { handleImage } = require("./controllers/handleImage");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, bcrypt, db);
});

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log("app running port 3000");
});
