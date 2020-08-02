const should = require('chai').should()
const expect = require('chai').expect
const mongoose = require('mongoose')

const { env } = require('../config/')
const { ProductModel } = require('../models')
const { ProductRepository } = require('../repositories')

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
  ProductModel.deleteMany({}, err => {
    if (err) throw err
    done()
  })
})

const productToCreate = {
  name: 'product test',
  slug: 'product-test',
  description: 'aaa',
  price: 123000
}

describe('ProductRepository Tests', () => {
  it ('create', async () => {
    let newProduct = await ProductRepository.create(productToCreate)
    newProduct.should.be.have.property('id')
    newProduct.should.be.have.property('name')
    newProduct.should.be.have.property('slug')
    newProduct.should.be.have.property('description')
  })
  it ('update', async () => {
    const EDITED_DATA = {
      name: 'product edited',
      price: 120000
    }
    let newProduct = await ProductRepository.create(productToCreate)
    let productEdited = await ProductRepository.update(newProduct.id, EDITED_DATA)
    productEdited.should.be.have.property('id')
    productEdited.id.should.be.equal(newProduct.id)
    productEdited.name.should.be.equal(EDITED_DATA.name)
    productEdited.price.should.be.equal(EDITED_DATA.price)
    productEdited.updatedAt.should.not.be.equal(newProduct.updatedAt)
  })
  it('delete', async () => {
    try {
      let newProduct = await ProductRepository.create(productToCreate)
      await ProductRepository.delete(newProduct.id)
      await ProductRepository.find(newProduct.id)
    } catch (e) {
      e.should.be.an('error')
    }
  })
  it('find', async () => {
    let newProduct = await ProductRepository.create(productToCreate)
    let product = await ProductRepository.find(newProduct.id)

    product.id.should.be.equal(newProduct.id)
    product.name.should.be.equal(newProduct.name)
    product.price.should.be.equal(newProduct.price)
  })
  it('getAll', async () => {
    await ProductRepository.create([productToCreate, productToCreate])
    products = await ProductRepository.getAll()
    products.should.be.a('array')
    expect(products.length >= 2).to.be.true
  })
})
