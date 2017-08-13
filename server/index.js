"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt        = require("bcrypt");
const app           = express();

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  secret: 'youHaveAday',
  maxAge: 24 * 60 * 60 * 1000
}));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) throw err;

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);

  // Handling the registration submission
  app.post("/register", (req, res) => {
    const user = req.body.username;
    const handle = req.body.handle;
    // const password = req.body.password;
    const password = bcrypt.hashSync(req.body.password, 10);

    // Search for user to see if they already exist in db
    db.collection('users').find({user:user}).toArray((err,result) => {
      if (result.length === 0) {
        // Add user, set session cookies
        db.collection('users').insertOne({user: user, handle: handle, password: password});
        req.session.user = user;
        req.session.handle = handle;
        res.status(200).send();
        return;
      } else {
        res.status(400).send();
        return;
      }
    });
  });

  // Logout handler
  app.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).send();
  });

  // Login handler
  app.post("/login", (req, res) => {

    const user = req.body.username;

    // Search for user
    db.collection('users').find({user:user}).toArray((err,result) => {

      if (result.length === 0) {
        res.status(400).send();
      } else {
        if (bcrypt.compareSync(req.body.password, result[0].password)) {
          req.session.user = result[0].user;
          req.session.handle = result[0].handle;
          res.status(200).send({user:user,handle:result[0].handle});
        } else {
          res.status(401).send();
        }
      }
    });

  });

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});