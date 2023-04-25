const { buildSchema } = require("graphql")

const schema = buildSchema(
    `

    type MartialArt {
        id: ID!
        title: String!
        description: String!
    }

    input CreateMartialArtInput {
        title: String! 
        description: String!
    }

    type Query {
        hello: String
        martialArts: [MartialArt]
    }

    type Mutation {
        createMartialArt(input: CreateMartialArtInput!): MartialArt 
    }



`
)

module.exports = { schema }