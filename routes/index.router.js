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
], validationMiddleware, ProductController.create)

router.get('/:id', [
  check('id').isMongoId()
], validationMiddleware, ProductController.get)

router.put('/:id', [
  check('id').isMongoId(),
  check('price').isNumeric().custom(value => {
    if (parseInt(value) < 0) throw new Error('price product should be a value greater than 0')
    return true
  }).optional()
], validationMiddleware, ProductController.update)

router.delete('/:id', [
  check('id').isMongoId()
], validationMiddleware, ProductController.delete)

router.get('/', [
  check('page').isNumeric().withMessage('page must be a number').optional(),
  check('page').custom(val => {
    if (val <= 0) throw new Error('page should be greather than 0')
    return true
  }).optional()
], validationMiddleware, ProductController.getAll)

module.exports = router
