const express = require("express");
const app = express();

function log(req, res, next) {
  const method = req.headers.method;
  const url = req.headers.url;
  const timestamp = new Date().toISOString();
  console.log(method, url, timestamp);
  next();
}

function auth(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (username == "manikanta" && password == "mani@123") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.get("/", log, auth, (req, res) => {
  res.send("maniiiiiiiii");
});

app.listen(3000);
