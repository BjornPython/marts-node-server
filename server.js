const http = require("http")
const PORT = process.env.PORT || 3000

const { handleUiRequest, handleScriptRequest, handleStylesRequest, handlePageNotFound } = require("./routes/files.route.js")
const { handleCreateRequest, handleReadRequest, handleUpdateRequest, handleDeleteRequest } = require("./routes/martial-arts.route.js")

const { schema } = require("./schema/type-defs.js")
const { root } = require("./schema/resolvers.js")

const { graphqlHTTP } = require("express-graphql")

// const root = {
//     hello: () => { console.log("IN HELLO..."); return "hello world" }
// }
const server = http.createServer(async (req, res) => {

    if (req.url === "/graphql" && req.method === "POST") {
        console.log("IN GRAPH: ");
        try {
            graphqlHTTP({
                schema: schema,
                rootValue: { ...root },
                graphiql: true, // Optional: Enables the GraphiQL UI for testing
            })(req, res);
        } catch (err) {
            console.error(err);
            res.statusCode = 400;
            res.end("Bad request");
        }
    }

    // Route for serving html
    else if (req.url === "/martial-arts" && req.method === "GET") { handleUiRequest(req, res) }

    // Route for CREATING a new martial art
    else if (req.url === "/martial-arts" && req.method === "POST") { handleCreateRequest(req, res) }

    // Route for READING current martial arts
    else if (req.url === "/data") { handleReadRequest(req, res) }

    // Route for UPDATING a martial art
    else if (req.url === "/update" && req.method === "PATCH") { handleUpdateRequest(req, res) }

    // Route for DELETING a martial art
    else if (req.url === "/delete" && req.method === "DELETE") { handleDeleteRequest(req, res) }

    // Route for serving the client.js file
    else if (req.url === "/client.js") { handleScriptRequest(req, res) }

    // Route for serving the styles.css file
    else if (req.url === "/styles.css") { handleStylesRequest(req, res) }

    else { handlePageNotFound(req, res) }
})


server.listen(PORT, () => { console.log(`SERVER RUNNING ON PORT: ${PORT}...`); })