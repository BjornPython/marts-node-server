const knex = require("knex")

// CONNECT TO MARTS DB WITH KNEX
const db = knex({
    client: "sqlite3",
    connection: { filename: "./marts.db" },
    useNullAsDefault: true
})

// ADD A MARTIAL ART
const createMartialArt = async (title, description) => {
    if (!title || !description) { throw new Error("no title or description") }
    const marts = await db("marts").insert({ title, description }, ["id"])
    if (marts.length >= 1) { return true } else { return false } // return true if create was succesful
}


// QUERY MARTIAL ARTS
const getAllMartialArts = async () => {
    const marts = await db("marts")
    if (marts) { return marts } else { throw new Error("Failed to get marts table") } // return true if query was succesful
}



// UPDATE
const updateDescription = async (newDesc, id) => {
    if (!newDesc || !id) { throw new Error("No new Description or id") }
    const update = await db("marts").insert({ id, description: newDesc }, ["id"]).onConflict("id").merge()
    if (update.length >= 1) { return true } else { return false } // return true if update was succesful
}


// DELETE
const deleteMartialArt = async (id) => {
    if (!id) { throw new Error("no id") }
    const deletedMart = await db("marts").where("id", id).del("id")
    if (deletedMart) { return true } else { return false } // return true if delete was succesful
}




module.exports = { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt }