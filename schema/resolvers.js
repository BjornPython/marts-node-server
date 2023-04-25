const { getAllMartialArts } = require("../models/martial-arts.model.js")


const root = {
    hello: () => { return "hello world" },

    martialArts: async () => { const data = await getAllMartialArts(); console.log(data); return data }


}

module.exports = { root }