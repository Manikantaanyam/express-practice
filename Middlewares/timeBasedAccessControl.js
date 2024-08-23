const express = require("express");
const app = express();

function timeMiddleware(req, res, next) {
  const time = new Date().getHours();
  const start = 9;
  const end = 17;
  const day = new Date().getDay();
  const allowedDays = [1, 2, 3, 4, 5];

  if (time >= start && time <= end && allowedDays.includes(day)) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

app.get("/business-info", timeMiddleware, (req, res) => {
  res.send("This is Business");
});

app.listen(3000);
