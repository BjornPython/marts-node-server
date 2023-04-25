const { getAllMartialArts, createMartialArt } = require("../models/martial-arts.model.js")


const root = {
    hello: () => { return "hello world" },

    martialArts: async () => { const data = await getAllMartialArts(); return data },

    createMartialArt: async ({ title, description }) => { const res = await createMartialArt(title, description); return createMartialArt }

}

module.exports = { root }