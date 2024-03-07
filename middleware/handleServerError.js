module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = err;
  if (err.name == "ValidationError") {
    statusCode = 400;
    error = err.message;
  }

  res.status(statusCode).send({
    error,
    stack: err.stack,
  });
};
