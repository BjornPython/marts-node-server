const http = require("http")
const fs = require("fs")
const PORT = process.env.PORT || 3000
const querystring = require('querystring');

const script = fs.readFileSync("./public/client.js", "utf-8")
const styles = fs.readFileSync("./public/styles.css", "utf-8")
const UI = fs.readFileSync("./public/marts.html", "utf-8")

const { createMartialArt, getAllMartialArts, deleteMartialArt, updateDescription } = require("./database.js")
const { callCreateMartialArt } = require("./services/martial-arts.js")
const server = http.createServer(async (req, res) => {

    // READ
    if (req.url === "/martial-arts" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(UI)
    }

    else if (req.url === "/martial-arts" && req.method === "POST") {
        callCreateMartialArt(req, res)
    }

    else if (req.url === "/delete" && req.method === "DELETE") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const bodyData = JSON.parse(body)
            const { id } = bodyData
            const success = await deleteMartialArt(id)
            if (success) {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(id)
            }
        });
    }

    else if (req.url === "/update" && req.method === "PATCH") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const bodyData = JSON.parse(body)
            const { id, newDesc } = bodyData
            const success = await updateDescription(newDesc, id)
            if (success) {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end()
            }
        });
    }

    // Route for getting client.js file
    else if (req.url === "/client.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" })
        res.end(script) // Send the script file
    }

    // Route for getting currentData
    else if (req.url === "/data") {
        const data = await getAllMartialArts()
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(data)) // send the current Data
    }

    // Route for getting styles.css file
    else if (req.url === "/styles.css") {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.end(styles) // Send css styles
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end("ERROR 404")
    }
})


server.listen(PORT, () => { console.log(`SERVER RUNNING ON PORT: ${PORT}...`); })