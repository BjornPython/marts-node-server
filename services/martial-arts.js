const { createMartialArt, getAllMartialArts, deleteMartialArt, updateDescription } = require("../models/martial-arts.js")
const querystring = require('querystring');
const fs = require("fs")

const UI = fs.readFileSync("./public/marts.html", "utf-8")

const callCreateMartialArt = async (req, res) => {
    let body = ""
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on('end', async () => {
        const formData = querystring.parse(body) // get form Data
        const { title, description } = formData // destructure formData values

        if (!title || !description) {
            res.writeHead(400, { "Content-Type": "text/html" })
            res.end("Missing title or description")
        }

        const success = await createMartialArt(title, description)

        if (success) { // If all is succesfull, return a status code 200
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(UI)
        } else {
            res.writeHead(400, { "Content-Type": "text/html" })
            res.end("Failed to create Martial Art.")
        }
    })
}

module.exports = { callCreateMartialArt }