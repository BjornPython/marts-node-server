const { callCreateMartialArt, callGetMartialArts, callUpdateMartialArt, callDeleteMartialArt } = require("../services/martial-art.service.js")

const fs = require("fs")
const UI = fs.readFileSync("./public/marts.html", "utf-8")
const querystring = require('querystring');


const { schema } = require("../schema/type-defs.js")
const { root } = require("../schema/resolvers.js")

const { graphql } = require("graphql")

const handleGqlRequest = async (req, res) => {
    let body = ""
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on('end', async () => {
        const { query, variables } = JSON.parse(body)
        const response = await graphql({
            schema,
            source: query,
            variableValues: variables,
            rootValue: { ...root },
        })
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(JSON.stringify(response))
    })
}




module.exports = { handleGqlRequest }