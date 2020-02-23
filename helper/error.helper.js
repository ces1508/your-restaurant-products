class AppError {
  NotFound (message = 'Resource not Found') {
    this._createError(404, message)
  }

  InternalServer (message = 'Sorry, we have problems, try later') {
    this._createError(500, message)
  }

  UserError (message = 'something wrong, please check the data') {
    this._createError(400, message)
  }

  _createError (status, message) {
    const error = new Error()
    error.message = message
    error.status = status
    throw error
  }
}

module.exports = AppError
