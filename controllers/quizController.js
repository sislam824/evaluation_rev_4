const Quiz = require("../models/Quiz");
const crypto = require("crypto");

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const quiz = new Quiz({
      title,
      questions,
      createdBy: req.user._id,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: "Failed to create " });
  }
};

exports.getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user._id });
    res.json(quizzes);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch quizzes" });
  }
};

exports.publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const permalink = crypto.randomBytes(3).toString("hex");
    quiz.permalink = permalink;
    quiz.published = true;
    await quiz.save();
    res.json({ message: "Quiz published", permalink });
  } catch (error) {
    res.status(400).json({ message: "Failed to publish quiz" });
  }
};

exports.getQuizByPermalink = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ permalink: req.params.permalink });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch quiz" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await quiz.remove();
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete quiz" });
  }
};
