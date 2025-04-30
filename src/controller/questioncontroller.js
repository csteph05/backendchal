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

exports.updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { question, choices, correctAnswer } = req.body;

  try {
    if (!question || !choices || !correctAnswer) {
      return res.status(400).send({
        status: "error",
        message: "All fields (question, choices, correctAnswer) are required.",
      });
    }

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: questionId },
      {
        question,
        choices,
        correctAnswer,
      },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({
        status: "error",
        message: "question not found.",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "Question deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "server error",
      error: err.message,
    });
  }
};

exports.getQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        status: "error",
        message: "question not found.",
      });
    }

    res.status(200).json({
      status: "ok",
      question,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "server error",
      error: err.message,
    });
  }
};

exports.listQuestions = async (req, res) => {
    try {
        const questions = await Question.find();

        res.status(200).json({
            status: "ok",
            count: question.length,
            questions,
        });
    } catch (err){
        res.status(500).json({
            status: "error",
            message: "Failed to fetch questions",
            error: err.message,
        });
    }
};


