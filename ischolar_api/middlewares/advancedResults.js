//Model, Populate
const advancedResults = (model, populate) => () => {
  return async (req, res, next) => {
    let TeachersQuery = model.find();

    //convert query string to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //Get Total Records
    const total = await model.counDocuments();
    const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      //Populate
      if (populate) { 
          TeachersQuery = TeachersQuery.populate(populate);
      }

    //Filtering/Searching
    if (req.query.name) {
      TeachersQuery = TeachersQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    //Pagination Result
    const pagiantion = {};
    //Add next
    if (endIndex < total) {
      pagiantion.next = { page: page + 1, limit };
    }

    //Add Previous
    if (startIndex < total) {
      pagiantion.previous = { page: page - 1, limit };
    }

    //Execute Query
    const teachers = await TeachersQuery.find().skip(skip).limit(limit);

    res.result = {
      total,
      pagination,
      result: teachers.length,
      status: "success",
      message: "Teachers Fetched Successfully",
      data: teachers,
    };

    next();
  };
};

module.exports = advancedResults;
