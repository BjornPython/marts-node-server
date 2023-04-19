const http = require("http")
const fs = require("fs")

const PORT = process.env.PORT || 3000

const script = fs.readFileSync("./public/client.js", "utf-8")

const marts = fs.readFileSync("./public/marts.html", "utf-8")

const styles = fs.readFileSync("./public/styles.css", "utf-8")

const martsData = fs.readFileSync("./public/marts.json", "utf-8")

const server = http.createServer((req, res) => {

    // READ
    if (req.url === "/martial-arts") {
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(marts)
    }   

    else if (req.url === "/client.js") {
        res.writeHead(200, {"Content-Type": "text/javascript"})
        res.end(script)
    }

    else if (req.url === "/data") {
        res.writeHead(200, {"Content-Type": "application/json"})
        console.log(JSON.stringify(martsData));
        res.end(JSON.stringify(martsData))
    }

    else if (req.url === "/styles.css") {
        res.writeHead(200, {"Content-Type": "text/css"})
        res.end(styles)
    }

    else if (req.url === "/create" || req.method === "POST") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log(`Request body: ${body}`);
            // Handle the request here

          });
        
    }   

    else {
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("ERROR 404")
    }
})


server.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT: ${PORT}...`);})