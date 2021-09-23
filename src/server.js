const express = require("express");
const redis = require("redis");
const validate = require("./middleware/validation.js");
const worker = require("./worker.js"); // eslint-disable-line

const client = redis.createClient({ host: process.env.REDIS_HOST });
const app = express();

app.get("/health-check", (req, res) => {
  return res.sendStatus(200);
});

app.head("/:ip", validate, (req, res) => {
  client.get(req.params.ip, (err, reply) => {
    if (reply) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("Not Found");
    }
  });
});

app.get("/:ip", validate, (req, res) => {
  client.get(req.params.ip, (err, reply) => {
    if (reply) {
      res.status(200).json(JSON.parse(reply));
    } else {
      res.status(404).send("Not Found");
    }
  });
});

app.listen(process.env.PORT);
