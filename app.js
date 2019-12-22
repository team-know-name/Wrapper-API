const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Works");
});

app.post("/map", (req, res) => {
  const { start_lat, start_long, end_lat, end_long } = req.body;
  let body = {
    start_lat,
    start_long,
    end_lat,
    end_long
  };
  console.log(body);
  fetch(`https://stark-temple-37550.herokuapp.com/map`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.listen(process.env.PORT || 8888, () => {
  console.log("Server started");
});
