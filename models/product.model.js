const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const { Schema } = mongoose

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, slug: 'name' },
  price: { type: Number, required: true },
  description: { type: String, index: true }
}, {
  autoIndex: false,
  timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)
