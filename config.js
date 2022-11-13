const mongoose = require("mongoose")
require("dotenv").config()
const asyncHandler = require("express-async-handler")

const dbConnect = asyncHandler(async () => {
    try {
        const respo = await mongoose.connect(process.env.MONGU_URL)
        return respo
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
})


module.exports =dbConnect