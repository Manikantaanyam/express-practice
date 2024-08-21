const express = require("express");
const app = express();
const users = [
  {
    name: "mani",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  const maniKidneys = users[0].kidneys;
  const numberOfKidneys = maniKidneys.length;
  let healthyKidneys = 0;
  for (let i = 0; i < maniKidneys.length; i++) {
    if (maniKidneys[i].healthy) {
      healthyKidneys++;
    }
  }
  const unhealthyKidneys = numberOfKidneys - healthyKidneys;
  res.json({
    numberOfKidneys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  const userKidneys = users[0].kidneys;
  userKidneys.push({
    healthy: isHealthy,
  });
  res.json({ msg: "done" });
});

app.put("/", (req, res) => {
  const userKidneys1 = users[0].kidneys;
  for (let i = 0; i < userKidneys1.length; i++) {
    if (!userKidneys1[i].healthy) {
      userKidneys1[i].healthy = true;
    }
  }
  res.json({});
});

app.delete("/", (req, res) => {
  const arr = [];
  let userKidneys2 = users[0].kidneys;
  for (let i = 0; i < userKidneys2.length; i++) {
    if (userKidneys2[i].healthy) {
      arr.push(userKidneys2[i]);
    }
  }
  users[0].kidneys = arr;
  res.json({ msg: "done" });
});

app.listen(3000);
