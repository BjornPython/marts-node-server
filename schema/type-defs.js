const { buildSchema } = require("graphql")

export const schema = buildSchema(`
    type Query {
        hello: String
    }
`)