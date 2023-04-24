const { callCreateMartialArt, callGetMartialArts, callUpdateMartialArt } = require("../services/martial-art.service.js")

const fs = require("fs")
const UI = fs.readFileSync("./public/marts.html", "utf-8")
const querystring = require('querystring');
const handleCreateRequest = async (req, res) => {
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

        const success = await callCreateMartialArt(title, description)

        if (success) { // If all is succesfull, return a status code 200
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(UI)
        } else {
            res.writeHead(400, { "Content-Type": "text/html" })
            res.end("Failed to create Martial Art.")
        }
    })
}


const handleReadRequest = async (req, res) => {
    const martialArts = await callGetMartialArts()
    if (martialArts) {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(martialArts)) // send the martial arts 
    } else {
        res.writeHead(400, { "Content-Type": "text/html" })
        res.end("Failed to read Martial Art.")
    }
}

const handleUpdateRequest = async (req, res) => {
    let body = ""
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on('end', async () => {
        const bodyData = JSON.parse(body)
        const { id, newDesc } = bodyData
        const success = await callUpdateMartialArt(newDesc, id)
        if (success) {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end()
        } else {
            res.writeHead(400, { "Content-Type": "text/html" })
            res.end("Failed to update Martial Art.")
        }
    });
}


module.exports = { handleCreateRequest, handleReadRequest }