const fs = require("fs")
const script = fs.readFileSync("./public/client.js", "utf-8")
const styles = fs.readFileSync("./public/styles.css", "utf-8")
const UI = fs.readFileSync("./public/marts.html", "utf-8")

const handleUiRequest = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(UI)
}

const handleScriptRequest = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/javascript" })
    res.end(script) // Send the script file  
}

const handleStylesRequest = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/css" })
    res.end(styles) // Send css styles
}

const handlePageNotFound = (req, res) => {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.end("ERROR 404")
}

module.exports = { handleUiRequest, handleScriptRequest, handleStylesRequest, handlePageNotFound }