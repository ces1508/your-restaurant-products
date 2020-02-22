const router = require('express').Router()
const ProductController = require('../controllers/products.controller')

router.get('/', ProductController.create)
router.get('/:id', (req, res) => {
  res.send(`get resource with id ${req.params.id}`)
})
router.put('/:id', (req, res) => {
  res.send(`updated resource with id ${req.params.id}`)
})
router.put('/:id', (req, res) => {
  res.send(`deleted resource with id ${req.params.id}`)
})

module.exports = router
