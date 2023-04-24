const { createMartialArt, getAllMartialArts, deleteMartialArt, updateDescription } = require("../models/martial-arts.model.js")

const callCreateMartialArt = async (title, description) => {
    const success = await createMartialArt(title, description)
    return success
}



module.exports = { callCreateMartialArt }