const express = require("express");
const router = express.Router();
const {
  getUserQuizzes,
  publishQuiz,
  getQuizByPermalink,
  deleteQuiz,
  createQuiz,
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/:permalink", getQuizByPermalink);
router.get("/", authMiddleware, getUserQuizzes);
router.put("/:id/publish", authMiddleware, publishQuiz);
router.post("/", authMiddleware, createQuiz);
router.delete("/:id", authMiddleware, deleteQuiz);

module.exports = router;
