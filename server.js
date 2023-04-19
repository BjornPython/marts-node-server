const http = require("http")
const fs = require("fs")
const uuid = require("uuid")
const PORT = process.env.PORT || 3000
const querystring = require('querystring');

const script = fs.readFileSync("./public/client.js", "utf-8")
const styles = fs.readFileSync("./public/styles.css", "utf-8")
const UI = fs.readFileSync("./public/marts.html", "utf-8")

const server = http.createServer((req, res) => {

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
        req.on('end', () => {
            const formData = querystring.parse(body) // get form Data
            const { title, description } = formData // destructure formData values
            const id = uuid.v4() // Create id for new martial art
            const currentMarts = JSON.parse(fs.readFileSync("./public/marts.json", "utf-8")) // Get The current martial arts.
            const newMart = { title, description, id } // Define new martial art to be added.
            currentMarts.push(newMart) // Push new martial art to marts.json file.
            fs.writeFileSync("./public/marts.json", JSON.stringify(currentMarts)) // Update the marts.json file

            // IF all is succesfull, return a status code 200
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(UI)
        })
    }

    // Route for getting client.js file
    else if (req.url === "/client.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" })
        res.end(script) // Send the script file
    }

    // Route for getting currentData
    else if (req.url === "/data") {
        const currentData = fs.readFileSync("./public/marts.json", "utf-8")
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(currentData)) // send the current Data
    }

    // Route for getting styles.css file
    else if (req.url === "/styles.css") {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.end(styles) // Send css styles
    }


    // FOR CRUDS
    // else if (req.url === "/create" && req.method === "POST") {
    //     let body = ""
    //     req.on("data", chunk => {
    //         body += chunk.toString()
    //     })
    //     req.on('end', () => {
    //         try {
    //             const bodyData = JSON.parse(body)
    //             const { title, description } = bodyData
    //             const id = uuid.v4()
    //             const currentMarts = JSON.parse(fs.readFileSync("./public/marts.json", "utf-8"))
    //             const newMart = { title, description, id }
    //             currentMarts.push(newMart)
    //             fs.writeFileSync("./public/marts.json", JSON.stringify(currentMarts))
    //             res.writeHead(200, { "Content-Type": "application/json" })
    //             res.end(JSON.stringify(newMart))

    //         } catch (err) { res.statusCode = 400; res.end() }
    //     });
    // }

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