const { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt } = require("../models/martial-arts.model.js")

const callCreateMartialArt = async (title, description) => {
    const success = await createMartialArt(title, description)
    return success
}

const callGetMartialArts = async () => {
    const martialArts = await getAllMartialArts()
    return martialArts
}

const callUpdateMartialArt = async (newDesc, id) => {
    const success = await updateDescription(newDesc, id)
    return success
}

module.exports = { callCreateMartialArt, callGetMartialArts, callUpdateMartialArt }