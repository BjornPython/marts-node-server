const { createMartialArt, getAllMartialArts, deleteMartialArt, updateDescription } = require("../models/martial-arts.model.js")

const callCreateMartialArt = async (title, description) => {
    const success = await createMartialArt(title, description)
    return success
}

const callGetMartialArts = async () => {
    const martialArts = await getAllMartialArts()
    return martialArts
}



module.exports = { callCreateMartialArt, callGetMartialArts }