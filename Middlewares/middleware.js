const express = require("express");
const app = express();
app.use(express.json());

function authWare(req, res, next) {
  const name = req.headers.name;
  const password = req.headers.password;
  if (name != "harkirat" && password != "pass") {
    res.status(400).json("Something invalid input");
  } else {
    next();
  }
}

function validationWare(req, res, next) {
  const kidneyId = req.query.kidneyId;
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(400).json({ msg: "invalid input" });
  } else {
    next();
  }
}

app.get("/home", authWare, validationWare, (req, res) => {
  res.json({ msg: "Your kindneys are healthy" });
});

//global catches

app.use((err, req, res, next) => {
  res.json({ msg: "error" });
});

app.listen(3000);
