const { getAllMartialArts, createMartialArt, updateDescription } = require("../models/martial-arts.model.js")


const root = {
    hello: () => { return "hello world" },

    martialArts: async () => { const data = await getAllMartialArts(); return data },

    createMartialArt: async ({ input }) => {
        const { title, description } = input
        const created = await createMartialArt(title, description);
        return created
    },

    updateMartialArt: async ({ input }) => {
        console.log("IN UPDATE RESOLVER");
        const { id, description } = input
        console.log(id, description);
        const updated = await updateDescription(description, id);
        return updated
    }



}

module.exports = { root }