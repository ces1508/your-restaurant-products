const { Errors } = require('../helper')
let _model = null

class BaseRepository extends Errors {
  constructor (model) {
    super()
    _model = model
  }

  create (data) {
    return _model.create(data)
  }

  async getAll (query = {}, page = 1, perPage = 5) {
    const limit = parseInt(perPage)
    const skip = (limit * (page - 1))
    const amount = await _model.countDocuments()
    const hasMore = amount > page * perPage
    const data = await _model.find(query).skip(skip).limit(limit)
    return { data, hasMore, page }
  }

  async find (id) {
    if (!id) return this.InternalServer('the id must be sent')
    const resource = await _model.findById(id)
    if (!resource) return this.NotFound()
    return resource
  }

  async update (id, data) {
    if (!id) return this.InternalServer('the id must be sent')
    await this.find(id)
    return _model.findByIdAndUpdate(id, data, { new: true })
  }

  async delete (id) {
    await _model.findByIdAndRemove(id)
  }
}

module.exports = BaseRepository
