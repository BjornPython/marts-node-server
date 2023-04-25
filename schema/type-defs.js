const { buildSchema } = require("graphql")

const schema = buildSchema(
    `
    type MartialArt {
        id: ID!
        title: String!
        description: String!
    }

    input CreateMartialArtInput {
        title: String
        description: String
    }

    input UpdateMartialArtInput {
        id: ID!
        description: String!
    }

    type Query {
        hello: String
        martialArts: [MartialArt]
    }

    type Mutation {
        createMartialArt(input: CreateMartialArtInput): MartialArt 
        updateMartialArt(input: UpdateMartialArtInput): MartialArt
    }



`
)

module.exports = { schema }