const { ProductRepository } = require('../repositories')
const Mutation = require('./mutations')

const Query = {
  products: async (_, { page = 1, perPage = 20 }) => {
    try {
      const data = await ProductRepository.getAll({}, page, perPage)
      return {
        page: data.page,
        hasMore: data.hasMore,
        products: data.data
      }
    } catch (e) {
      return ProductRepository.InternalServer(e.message)
    }
  },
  product: (_, { id }) => {
    return ProductRepository.find(id)
  },
  // productPatch: (product, { type } = { type: 'ACTIVE' }) => {
  //   return type === 'INACTIVE'
  //     ? product.productPatchInactive
  //     : product.productPatchActive
  // },

}

module.exports = { Query, Mutation }
