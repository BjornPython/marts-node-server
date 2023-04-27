const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
    const createdMart = await prisma.marts.create({ data: { title, description } })
    if (createdMart) { return createdMart } else { return false } // return true if create was succesful
}


// QUERY MARTIAL ARTS
const getAllMartialArts = async () => {
    const martialArts = await prisma.marts.findMany()
    if (martialArts) { return martialArts } else { return false } // return true if query was succesful
}



// UPDATE
const updateDescription = async (newDesc, id) => {
    if (!newDesc || !id) { throw new Error("No new Description or id") }
    const updatedMart = await prisma.marts.update({
        where: {
            id: parseInt(id)
        },
        data: {
            description: newDesc
        }
    })
    if (updatedMart) { return updatedMart } else { return false } // return true if update was succesful
}


// DELETE
const deleteMartialArt = async (id) => {
    if (!id) { throw new Error("no id") }
    const deletedMart = await prisma.marts.delete({
        where: {
            id: parseInt(id)
        }
    })
    if (deletedMart) { return deletedMart } else { return false } // return true if delete was succesful
}




module.exports = { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt }