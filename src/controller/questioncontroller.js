const Question = require("../models/Questions");

exports.createQuestion = async (req, res) => {
  const { question, choices, correctAnswer } = req.body;

  if (!question || !choices || !correctAnswer) {
    return res.status(400).send({
      status: "error",
      message: "All fields (question, choices, correctAnswer) are required.",
    });
  }
  try {
    const newQuestion = new Question({
      question,
      choices,
      correctAnswer,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).send({
      status: "ok",
      message: "Question created succesfully",
      question: savedQuestion,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message || "an error occurred while creating the question.",
    });
  }
};

// exports.update

// exports.delete

// exports.get

// exports.list

// exports.checkAnswer
