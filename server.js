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

app.post("/signin", handleSignin(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:id", handleProfile(db));

app.put("/image", handleImage(db));

app.listen(3000, () => {
  console.log("app running port 3000");
});
