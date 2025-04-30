const express = require('express');
const router = express.Router();
const questionController = require("../controller/questioncontroller");

router.post("/create", questionController.createQuestion);

router.put("/update/:questionId", questionController.updateQuestion);

router.delete("/delete/:questionId", questionController.deleteQuestion);

router.get("/get/:questionId", questionController.getQuestion);

router.get("/list", questionController.listQuestions);

router.post("check-answer/:questionId", questionController.checkAnswer);

module.exports = router;
