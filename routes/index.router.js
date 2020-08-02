const router = require('express').Router()
const { check } = require('express-validator')

const { validationMiddleware } = require('../middlewares')
const ProductController = require('../controllers/products.controller')

router.post('/', [
  check('name').isString().trim(),
  check('price').isNumeric().custom(value => {
    if (parseInt(value) < 0) throw new Error('price product should be a value greater than 0')
    return true
  })
], validationMiddleware.validateError, ProductController.create)

router.get('/:id', [
  check('id').isMongoId()
], validationMiddleware.validateError, ProductController.get)

router.put('/:id', [
  check('id').isMongoId(),
  check('price').isNumeric().custom(validationMiddleware.validateNumberGreatherThanZero).optional()
], validationMiddleware.validateError, ProductController.update)

router.delete('/:id', [
  check('id').isMongoId()
], validationMiddleware.validateError, ProductController.delete)

router.get('/', [
  check('page').isNumeric().withMessage('page must be a number').optional(),
  check('page').custom(validationMiddleware.validateNumberGreatherThanZero).optional(),
  check('perPage').isNumeric().withMessage('must be a number').optional(),
  check('perPage').custom(validationMiddleware.validateNumberGreatherThanZero).optional()
], validationMiddleware.validateError, ProductController.getAll)

module.exports = router
