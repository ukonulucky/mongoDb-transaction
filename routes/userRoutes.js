const { createUserOne, createUserTwo, creditUser2AndDebitUserOne } = require("../controlers/userCtl")

const express = require("express")

const userRouter = express()


userRouter.post("/createUserOne", createUserOne)

userRouter.post("/createUserTwo", createUserTwo)

userRouter.put("/transact", creditUser2AndDebitUserOne)


module.exports = {
    userRouter
}


