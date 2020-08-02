const BaseController = require('./base.controller')
const { ProductRepository } = require('../repositories')

class ProductController extends BaseController {
  constructor () {
    super(ProductRepository)
  }
}

module.exports = new ProductController()
