const { buildSchema } = require("graphql")

const schema = buildSchema(
    `

    type martialArt {
        id: ID!
        title: String!
        description: String!
    }

    type Query {
        hello: String
        martialArts: [martialArt]
    }
`
)

module.exports = { schema }