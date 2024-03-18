import jwt from "jsonwebtoken";
import CustomError from "../../helpers/errors/CustomError.js";
import User from "../../models/User.js";
// helpers
import {
  getAccessTokenFromHeader,
  isTokenIncluded,
} from "../../helpers/authorization/tokenHelpers.js";
import asyncErrorWrapper from "express-async-handler";

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

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  });
};

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (user.role !== "admin")
    return next(
      new CustomError("Youre not authorized to access this route", 403)
    );

  return next();
});

export { getAccessToRoute, getAdminAccess };
