const express = require("express");
const { newsArticleModel } = require("./connector");
// const mongoose = require("mongoose");
const app = express();
const port = 8080;

const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req, res) => {
  const { limit, offset } = req.query;
  if (isNaN(limit) || isNaN(offset)) {
    const result = await newsArticleModel.find().skip(0).limit(10);
    res.send(result);
  } else {
    const result = await newsArticleModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit));
    res.send(result);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
