const errorHandler = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  // Duplicate key error
  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate Field - ${error}`;
    err.statusCode = 400;
  }

  // Cast error
  if (err.name === "CastError") {
    const path = err.path;
    err.message = `Invalid Format of ${path}`;
    err.statusCode = 400;
  }

  return res
    .status(err.statusCode)
    .json({
      success: false,
      message: process.env.NODE_ENV.trim() === "DEVELOPMENT" ? err : err.message,
    });
};

module.exports = { errorHandler };