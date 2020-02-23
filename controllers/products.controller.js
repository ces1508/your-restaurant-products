const { ProductRepository } = require('../repositories')

class ProductController {
  async create (req, res) {
    try {
      const body = req.body
      const product = await ProductRepository.create({ ...body })
      res.status(201).json(product)
    } catch (e) {
      ProductRepository.InternalServer()
    }
  }

  async get (req, res) {
    const product = await ProductRepository.find(req.params.id)
    res.json(product)
  }

  async update (req, res) {
    const { id } = req.params
    const data = req.body
    if (Object.keys(data).length === 0) return ProductRepository.UserError('data must be sent')
    if (data.slug) delete data.slug
    if (data.id) delete data.id
    const product = await ProductRepository.update(id, data)
    res.json(product)
  }

  async delete (req, res) {
    const { id } = req.params
    await ProductRepository.find(id)
    await ProductRepository.delete(id)
    return res.json({ deleted: true })
  }

  async getAll (req, res) {
    try {
      const data = await ProductRepository.getAll()
      res.json(data)
    } catch (e) {
      ProductRepository.InternalServer()
    }
  }
}

module.exports = new ProductController()
