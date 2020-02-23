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

  getAll () {
    return _model.find()
  }

  async find (id) {
    if (!id) return this.InternalServer('the id must be sent')
    const resource = await _model.findById(id)
    if (!resource) return this.NotFound()
    return resource
  }

  update (id, data) {
    if (!id) return this.InternalServer('the id must be sent')
    return _model.findByIdAndUpdate(id, data, { new: true })
  }

  async delete (id) {
    await _model.findByIdAndRemove(id)
  }
}

module.exports = BaseRepository
