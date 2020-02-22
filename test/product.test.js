const mongoose = require('mongoose')
const Product = require('../models/product.model')
const { env } = require('../config/')
const should = require('chai').should()
const expect = require('chai').expect


before(function beforeProductTest (done) {
  mongoose.connect(`mongodb://${env.DATABASE_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    user: env.DATABASE_USERNAME,
    pass: env.DATABASE_PASSWORD,
    dbName: env.DATABASE_NAME
  }, err => {
    if (err) {
      process.exit(0)
    }
    done()
  })
})

after(done => {
  Product.deleteMany({}, err => {
    if (err) throw err
    done()
  })
})

describe('creating products', function describeCreatingTestProduct () {
  it('should be fail', () => {
    let product = new Product({
      name: 'product test',
      slug: 'product-test',
      description: 'aaa'
    })
    product.save((err, data) => {
      err.name.should.be.equal('ValidationError')
      err.errors.should.be.a('object')
      err.errors.should.have.property('price')
    })
  })

  it('should create a product', () => {
    const productToSave = {
      name: 'product2',
      slug: 'product-2',
      price: 3,
      description: 'a single description'
    }
    let product = new Product(productToSave)
    product.save((err, data) => {
      data.should.have.property('_id')
      data.should.have.property('createdAt')
      data.should.have.property('name')
      data.should.have.property('slug')
      data.should.have.property('price')
      data.name.should.be.equal(productToSave.name)
      data.price.should.be.a('number')
      data.price.should.be.equal(productToSave.price)
    })
  })

  it('should update a product', async () => {
    const productToSave = {
      name: 'product2',
      slug: 'product-2',
      price: 3,
      description: 'a single description'
    }
    try {
      const product = new Product(productToSave)
      await product.save()
      const NEW_PRODUCT_NAME = 'product edited'
      const productEdited = await Product.findByIdAndUpdate(product.id, { name: NEW_PRODUCT_NAME }, { new: true })
      productEdited.should.have.property('id')
      productEdited.id.should.be.equal(product.id)
      productEdited.name.should.be.equal(NEW_PRODUCT_NAME)
    } catch (e) {
      throw e
    }
  })

  it ('should delete a product', async () => {
    const productToSave = {
      name: 'product2',
      slug: 'product-2',
      price: 3,
      description: 'a single description'
    }
    try {
      let product = await Product.create(productToSave)
      product = await Product.findByIdAndRemove(product.id)
      product = await Product.findById(product.id)
      expect(product).to.be.null
    } catch (e) {
      throw e
    }
  })
})
