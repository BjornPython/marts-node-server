const knex = require("knex")

// let sql;
// const sqlite3 = require("sqlite3").verbose()


// CONNECT TO MARTS DB WITH KNEX
const db = knex({
    client: "sqlite3",
    connection: { filename: "./marts.db" }
})


const createMartialArt = async (title, description) => {
    if (!title || !description) { throw new Error("no title or description") }
}


// QUERY MARTIAL ARTS
const getAllMartialArts = async () => {
    const marts = await db("marts")
    console.log("MARTS: ", marts);
    return marts
}



// UPDATE
const updateDescription = async (newDesc, id) => {
    if (!newDesc || !id) { throw new Error("No new Description or id") }

}


// DELETE
const deleteMartialArt = async (id) => {
    if (!id) { throw new Error("no id") }

}




module.exports = { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt }