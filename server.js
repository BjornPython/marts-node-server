const http = require("http")
const PORT = process.env.PORT || 3000

const { handleUiRequest, handleScriptRequest, handleStylesRequest, handlePageNotFound } = require("./routes/files.route.js")
const { handleGqlRequest } = require("./routes/martial-arts.route.js")



const server = http.createServer(async (req, res) => {

    if (req.url === "/graphql" && req.method === "POST") { handleGqlRequest(req, res) }

    // Route for serving html
    else if (req.url === "/martial-arts" && req.method === "GET") { handleUiRequest(req, res) }

    // Route for serving the client.js file
    else if (req.url === "/client.js") { handleScriptRequest(req, res) }

    // Route for serving the styles.css file
    else if (req.url === "/styles.css") { handleStylesRequest(req, res) }

    else { handlePageNotFound(req, res) }
})


server.listen(PORT, () => { console.log(`SERVER RUNNING ON PORT: ${PORT}...`); })