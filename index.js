const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const auth = require("./routes/api/authentication");

const profile = require("./routes/api/profile");
const directory = require("./routes/api/directory");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected"))
  .catch(error => console.log(error));

// Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware for passport
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/auth", auth);
// app.use("/api/profile", profile);
// app.use("/api/directory", directory);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`I am on port on ${port} ${db}`));
