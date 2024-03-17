import CustomError from "../../helpers/errors/CustomError.js";
import jwt from "jsonwebtoken";
// helpers
import {
  getAccessTokenFromHeader,
  isTokenIncluded,
} from "../../helpers/authorization/tokenHelpers.js";

const getAccessToRoute = (req, res, next) => {
  // Token
  const { JWT_SECRET_KEY } = process.env;

  if (!isTokenIncluded(req))
    return next(
      new CustomError("Youre not authorized to access this route"),
      401
    );

  const access_token = getAccessTokenFromHeader(req);

  jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return next(
        new CustomError("Youre not authorized to access this route", 401)
      );

    console.log(decoded);
    next();
  });
  // CustomError
};

export { getAccessToRoute };
