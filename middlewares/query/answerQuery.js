import asyncErrorWrapper from "express-async-handler";

import { searchHelper, paginationHelper } from "./queryMiddlewareHelpers.js";

const answerQueryMiddleware = (model, options) => {
  return asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const arrName = "answers";

    const total = (await model.findById(id))["answerCount"];
    const paginationResult = await paginationHelper(total, undefined, req);
    const { startIndex, limit } = paginationResult;

    let queryObject = {};
    queryObject[arrName] = { $slice: [startIndex, limit] };

    let query = model.find({ _id: id }, queryObject);

    const populate = options.population;
    if (populate) {
      query = query.populate(populate);
    }

    const queryResult = await query;

    res.queryResults = {
      success: true,
      count: queryResult.length,
      pagination: paginationResult.pagination,
      data: queryResult,
    };

    next();
  });
};

export default answerQueryMiddleware;
