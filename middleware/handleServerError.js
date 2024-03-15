module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500; //if there is err.statusCode use it else use 500
  let error = err.message;
  if (err.name == "ValidationError") {
    statusCode = 400;
    error = err.message;
  }
  
  res.status(statusCode).send({
    error,
    stack: err.stack,
  });
};
