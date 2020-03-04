const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const graphqlConfig = {
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark',
      'editor.editor.fontSize': 25
    }
  }
}

module.exports = graphqlConfig
