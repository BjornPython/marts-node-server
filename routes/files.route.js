const fs = require("fs")
const script = fs.readFileSync("./public/client.js", "utf-8")
const styles = fs.readFileSync("./public/styles.css", "utf-8")
const UI = fs.readFileSync("./public/marts.html", "utf-8")

const handleUiRequest = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(UI)
}


module.exports = { handleUiRequest }