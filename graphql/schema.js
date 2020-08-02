const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Product {
    id: ID
    name: String
    slug: String
    price: Int
    description: String
  }

  fragment productFields on Product {
    name: String
    slug: String
    price: Int
    description: String
    status: String
  }

  input ProductInput {
    name: String!
    slug: String
    price: Int!
    description: String
  }


  enum PatchStatus {
    ACTIVE
    INACTIVE
    OUTSTOCK
    WITHOUTINGREDIENTS
  }

  type ProductConnection {
    page: Int!
    hasMore: Boolean!
    products: [Product]!
  }


type ProductDeleted {
  status: String!
  deleted:Boolean!
  deletedProduct: Product
}
  type Query {
    products(
      """
      The number of results to show. Must be >= 1. default: 20
      """
       perPage: Int
      """
       if you add a page number here, it will onl return results of current page, default = 1
       """
       page: Int
     ): ProductConnection
     product(id: ID!): Product!
    dummy: String
  }



  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, data: ProductInput): Product
    deleteProduct(id: ID!): ProductDeleted
  }
`

module.exports = typeDefs
