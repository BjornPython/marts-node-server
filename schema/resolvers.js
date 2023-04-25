const { getAllMartialArts, createMartialArt, updateDescription } = require("../models/martial-arts.model.js")


const root = {
    hello: () => { return "hello world" },

    martialArts: async () => { const data = await getAllMartialArts(); return data },

    createMartialArt: async ({ input }) => {
        const { title, description } = input
        const created = await createMartialArt(title, description);
        return created
    },

    updateMartialArt: async ({ id, description }) => { const res = await updateDescription(id, description); return res }



}

module.exports = { root }