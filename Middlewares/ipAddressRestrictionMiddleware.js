const express = require("express");
const app = express();

const allowedIPs = ["127.0.0.1", "192.168.1.1", "192.168.1.2"];

function ipAddress(req, res, next) {
  let clientIp = req.ip;

  if (clientIp === "::1") {
    clientIp = "127.0.0.1";
  }

  if (allowedIPs.includes(clientIp)) {
    next();
  } else {
    res.status(403).send("Forbidden status code");
  }
}

app.get("/admin-dashboard", ipAddress, (req, res) => {
  res.send("manikanta");
});

app.listen(3000);
