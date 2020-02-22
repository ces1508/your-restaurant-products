const appHandleError = (err, req, res, next) => {
  const httpStatus = err.status || 500
  res
    .status(httpStatus)
    .json({
      error: true,
      status: httpStatus,
      message: err.message || 'internal server error'
    })
}

module.exports = appHandleError
