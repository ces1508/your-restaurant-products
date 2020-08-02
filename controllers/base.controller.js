let _repository = null

class BaseController {
  constructor (reponsitory) {
    _repository = reponsitory
  }

  async create (req, res) {
    try {
      const body = req.body
      const product = await _repository.create({ ...body })
      res.status(201).json(product)
    } catch (e) {
      _repository.InternalServer()
    }
  }

  async get (req, res) {
    const product = await _repository.find(req.params.id)
    res.json(product)
  }

  async update (req, res) {
    const { id } = req.params
    const data = req.body
    if (Object.keys(data).length === 0) return _repository.UserError('data must be sent')
    if (data.slug) delete data.slug
    if (data.id) delete data.id
    const product = await _repository.update(id, data)
    res.json(product)
  }

  async delete (req, res) {
    const { id } = req.params
    await _repository.find(id)
    await _repository.delete(id)
    return res.json({ deleted: true })
  }

  async getAll (req, res) {
    try {
      const { page, perPage = 20 } = req.query
      const data = await _repository.getAll({}, page, perPage)
      res.json(data)
    } catch (e) {
      console.log(e.message)
      _repository.InternalServer()
    }
  }
}

module.exports = BaseController
