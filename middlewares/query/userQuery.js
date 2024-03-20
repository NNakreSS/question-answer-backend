import asyncErrorWrapper from "express-async-handler";

import { searchHelper, paginationHelper } from "./queryMiddlewareHelpers.js";

const userQueryMiddleware = (model, options) => {
  return asyncErrorWrapper(async (req, res, next) => {
    let query = model.find();

    // search by name
    query = searchHelper("name", query, req);

    // pagination
    const total = await model.countDocuments();
    const paginationResult = await paginationHelper(total, query, req);
    query = paginationResult.query;
    const pagination = paginationResult.pagination;

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.lenght,
      pagination,
      data: queryResults,
    };

    next();
  });
};

export default userQueryMiddleware;
