const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/file", (req, res) => {
  fs.readdir("./folders", (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/file/:filename", (req, res) => {
  const filepath = path.join(__dirname, "./folders", req.params.filename);
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("msg not found");
    } else {
      res.send(data);
    }
  });
});


app.listen(3000);
