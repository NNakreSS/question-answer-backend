const searchHelper = (searchKey, query, req) => {
  const search = req.query.search;
  if (search) {
    const searchObject = {};

    const regex = new RegExp(search, "i");
    searchObject[searchKey] = regex;

    return query.where(searchObject);
  }
  return query;
};

const questionSortHelper = (query, req) => {
  const sortKey = req.query.sortBy;
  if (sortKey === "most-answered") {
    return query.sort("-answerCount");
  } else if (sortKey === "most-liked") {
    return query.sort("-likeCount");
  } else return query.sort("-createdAt");
};

const paginationHelper = async (total, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = {};

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  return {
    query: query?.skip(startIndex).limit(limit),
    pagination,
    startIndex,
    limit,
  };
};

export { searchHelper, questionSortHelper, paginationHelper };
