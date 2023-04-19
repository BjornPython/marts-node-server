const http = require("http")
const fs = require("fs")

const PORT = process.env.PORT || 3000

const script = fs.readFileSync("./public/client.js", "utf-8")

const marts = fs.readFileSync("./public/marts.html", "utf-8")

const server = http.createServer((req, res) => {

    // READ
    if (req.url === "/martial-arts") {
        console.log("MARTIAL ARTS: ", marts);
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(marts)
    } 

    else if (req.url === "/client.js") {
        console.log("SCRIPT: ", script);
        res.writeHead(200, {"Content-Type": "text/javascript"})
        res.end(script)
    }

    else {
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("ERROR 404")
    }
})


server.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT: ${PORT}...`);})