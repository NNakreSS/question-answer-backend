const getAllQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Question",
  });
};

export { getAllQuestions };
