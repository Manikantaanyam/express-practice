const express = require("express");
const app = express();

app.use(loggingMiddleWare);

function loggingMiddleWare(req, res, next) {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();
  console.log(`Method is ${method} url is ${url} and time is ${time}`);
  next();
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  res.json({
    msg: "post method",
  });
});

app.listen(3000);
