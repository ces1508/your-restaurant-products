const Product = require('../models/product.model')

class ProductController {
  async create (req, res) {
    try {
      const product = new Product({
        name: 'carro rc',
        price: 3020
      })
      await product.save()
      res.send(product)
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = new ProductController()
