let _model = null

class BaseRepository {
  constructor (model) {
    _model = model
  }

  create (data) {
    return _model.create(data)
  }

  getAll () {
    return _model.find()
  }

  find (id) {
    return _model.findById(id)
  }

  update (id, data) {
    return _model.findByIdAndUpdate(id, data, { new: true })
  }

  delete (id) {
    return _model.findByIdAndRemove(id)
  }
}

module.exports = BaseRepository
