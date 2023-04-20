const http = require("http")
const fs = require("fs")
const uuid = require("uuid")
const PORT = process.env.PORT || 3000
const querystring = require('querystring');

const script = fs.readFileSync("./public/client.js", "utf-8")
const styles = fs.readFileSync("./public/styles.css", "utf-8")
const UI = fs.readFileSync("./public/marts.html", "utf-8")

const { createMartialArt, getAllMartialArts } = require("./database.js")

const server = http.createServer(async (req, res) => {

    // READ
    if (req.url === "/martial-arts" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(UI)
    }


    else if (req.url === "/martial-arts" && req.method === "POST") {
        console.log("IN CREATE...");
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const formData = querystring.parse(body) // get form Data
            const { title, description } = formData // destructure formData values
            const success = await createMartialArt(title, description)
            // IF all is succesfull, return a status code 200
            if (success) {
                res.writeHead(200, { "Content-Type": "text/html" })
                res.end(UI)
            }

        })
    }

    // Route for getting client.js file
    else if (req.url === "/client.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" })
        res.end(script) // Send the script file
    }

    // Route for getting currentData
    else if (req.url === "/data") {
        const data = await getAllMartialArts()
        console.log(typeof data);
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(data)) // send the current Data
    }

    // Route for getting styles.css file
    else if (req.url === "/styles.css") {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.end(styles) // Send css styles
    }


    else if (req.url === "/delete" && req.method === "DELETE") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            try {
                const bodyData = JSON.parse(body)
                const { id } = bodyData
                const currentMarts = JSON.parse(fs.readFileSync("./public/marts.json", "utf-8"))
                const newMarts = currentMarts.filter((mart) => { return mart.id !== id })
                fs.writeFileSync("./public/marts.json", JSON.stringify(newMarts))
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(id)
            } catch (err) { res.statusCode = 400; res.end() }

        });
    }

    else if (req.url === "/update" && req.method === "PATCH") {
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            try {
                const currentMarts = JSON.parse(fs.readFileSync("./public/marts.json", "utf-8"))
                const bodyData = JSON.parse(body)
                const { id, title, newDesc } = bodyData
                const newMart = { id, title, description: newDesc }
                const newMarts = currentMarts.filter(mart => { return mart.id !== id })
                newMarts.push(newMart)
                fs.writeFileSync("./public/marts.json", JSON.stringify(newMarts))
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end()
            } catch (err) { res.statusCode = 400; res.end() }
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end("ERROR 404")
    }
})


server.listen(PORT, () => { console.log(`SERVER RUNNING ON PORT: ${PORT}...`); })