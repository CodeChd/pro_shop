const  notFound = (req, res, next) => {
  const error = new Error(`Not Found`);
  res.status(404);
  next(error);
};

const errHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found!";
    statusCode = 404;
  }

  //custom response if error occurs
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "nice" : err.stack,
  });
};

export { notFound, errHandler };