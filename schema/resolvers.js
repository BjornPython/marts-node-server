const { getAllMartialArts, createMartialArt, updateDescription, deleteMartialArt } = require("../models/martial-arts.model.js")


const root = {
    hello: () => { return "hello world" },

    martialArts: async () => { const data = await getAllMartialArts(); return data },

    createMartialArt: async ({ input }) => {
        const { title, description } = input
        const created = await createMartialArt(title, description);
        return created
    },

    updateMartialArt: async ({ input }) => {
        const { id, description } = input
        console.log(id, description);
        const updated = await updateDescription(description, id);
        return updated
    },


    deleteMartialArt: async ({ input }) => {
        const { id } = input
        const deletedId = await deleteMartialArt(id)
        return deletedId
    }


}

module.exports = { root }