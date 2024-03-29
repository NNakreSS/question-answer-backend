import CustomError from "../../helpers/errors/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  switch (customError.name) {
    case "SyntaxError":
      customError = new CustomError("Unexpected syntax error", 400);
      break;
    case "ValidationError":
      customError = new CustomError(err.message, 400);
      break;
    case "CastError":
      customError = new CustomError("Please provide a valid id", 400);
      break;
    default:
      break;
  }

  if (err.code == 11000) {
    // dublicated key
    customError = new CustomError(
      "Dublicate key Found : Check your input",
      400
    );
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  });
};

export default customErrorHandler;
