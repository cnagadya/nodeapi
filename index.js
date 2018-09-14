const express = require("express");
const mongoose = require("mongoose");

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

app.get("/", (request, response) => response.send("I am Tinah"));

app.use("/api/auth", auth);
// app.use("/api/profile", profile);
// app.use("/api/directory", directory);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`I am on port on ${port} ${db}`));
