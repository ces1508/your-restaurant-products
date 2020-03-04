const { ProductRepository } = require('../repositories')

const Mutation = {
  createProduct: async (_, { data }, c, i) => {
    return ProductRepository.create(data)
  },
  updateProduct: async (_, { id, data }) => {
    return ProductRepository.update(id, data)
  },
  deleteProduct: async (_, { id }) => {
    try {
      let product = await ProductRepository.find(id)
      await ProductRepository.delete(id)
      return {
        status: 'success',
        deleted: true,
        deletedProduct: product
      }
    } catch (e) {
      return {
        status: 'error',
        deleted: false,
        deletedProduct: null
      }
    }
  }
}

module.exports = Mutation