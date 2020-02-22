const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  description: { type: String, index: true }
}, {
  autoIndex: false,
  timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)
