const http = require("http")
const PORT = process.env.PORT || 3000

const martialArts = require("./public/marts.json")

const server = http.createServer((req, res) => {
    if (req.url === "/martial-arts") {
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.end(JSON.stringify(martialArts))
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.end("ERROR 404")
    }
})


server.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT: ${PORT}...`);})