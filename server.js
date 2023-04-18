const http = require("http")
const martialArts = require("./data/marts.json")
const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    console.log("METHODS: ", res.meth);
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(martialArts))
})


server.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT: ${PORT}...`);})