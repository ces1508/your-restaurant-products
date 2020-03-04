const { validationResult } = require('express-validator')

const validateError = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  next()
}

const validateNumberGreatherThanZero = val => {
  if (val < 1) throw new Error('must be greather than 0')
  return true
}

module.exports = {
  validateError,
  validateNumberGreatherThanZero
}
