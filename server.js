const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

let quizzes = [];

app.post("/api/quiz", (req, res) => {
  const quizData = req.body;
  if (!quizData.title || !quizData.questions) {
    return res.status(400).json({ message: "Title and questions are missing" });
  }

  quizzes.push(quizData);
  console.log("Quiz Created:", quizData);

  return res.status(201).json({ message: "Quiz created ", quiz: quizData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
