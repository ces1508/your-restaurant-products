const { Product: ProductModel } = require('../models/')
const BaseRepository = require('./base.respository')

class ProductRepository extends BaseRepository {
  constructor () {
    super(ProductModel)
    this.model = ProductModel
  }
}
