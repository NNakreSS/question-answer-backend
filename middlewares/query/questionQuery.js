import asyncErrorWrapper from "express-async-handler";
import {
  questionSortHelper,
  searchHelper,
  paginationHelper,
} from "./queryMiddlewareHelpers.js";

const questionQueryMiddleware = (model, options) => {
  return asyncErrorWrapper(async (req, res, next) => {
    let query = model.find();

    // search
    query = searchHelper("title", query, req);

    // populate
    const populate = options?.population;
    if (populate) {
      query = query.populate(populate);
    }

    // sort
    query = questionSortHelper(query, req);

    // pagenation
    const resultPagination = await paginationHelper(model, query, req);
    query = resultPagination.query;
    const pagination = resultPagination.pagination;

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    };

    next();
  });
};

export default questionQueryMiddleware;
