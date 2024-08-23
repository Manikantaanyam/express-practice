const express = require("express");
const app = express();

function authenticationMiddleWare(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (username == "manikanta" && password == "mani@123") {
    next();
  } else {
    res.status(401).send("unauthorised status code");
  }
}

function roleCheckMiddleWare(req, res, next) {
  const role = req.headers.role;
  if (role != "admin") {
    res.status(403).send("Forbidden Response");
  } else {
    next();
  }
}

app.use(authenticationMiddleWare);

app.get("/admin", roleCheckMiddleWare, (req, res) => {
  res.send("admin access granted");
});

app.get("/about", (req, res) => {
  res.send("Working fine");
});

app.listen(3000);
