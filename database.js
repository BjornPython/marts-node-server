const knex = require("knex")

// let sql;
// const sqlite3 = require("sqlite3").verbose()


// CONNECT TO MARTS DB WITH KNEX
const db = knex({
    client: "sqlite3",
    connection: { filename: "./marts.db" },
    useNullAsDefault: true
})


const createMartialArt = async (title, description) => {
    if (!title || !description) { throw new Error("no title or description") }
}


// QUERY MARTIAL ARTS
const getAllMartialArts = async () => {
    const marts = await db("marts")
    if (marts) { return marts } else { throw new Error("Failed to get marts table") }
}



// UPDATE
const updateDescription = async (newDesc, id) => {
    if (!newDesc || !id) { throw new Error("No new Description or id") }
    const update = await db("marts").insert({ id, description: newDesc }, ["id"]).onConflict("id").merge()
    if (update.length >= 1) { return true } else { return false }
}


// DELETE
const deleteMartialArt = async (id) => {
    if (!id) { throw new Error("no id") }
    const deletedMart = await db("marts").where("id", id).del("id")
    console.log("DELETED MART: ", deletedMart);
    if (deletedMart) { return true } else { return false }
}




module.exports = { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt }