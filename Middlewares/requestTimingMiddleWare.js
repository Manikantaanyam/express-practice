const express = require("express");
const app = express();

function requestTimingMiddleWare(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const end = Date.now();
    console.log(end - start);
  });
  next();
}

app.use(requestTimingMiddleWare);

app.get("/", (req, res) => {
  res.json({
    msg: "Get Request",
  });
});

app.get("/about", (req, res) => {
  setTimeout(() => {
    res.send("Sending");
  }, 5000);
});

app.listen(3000);
