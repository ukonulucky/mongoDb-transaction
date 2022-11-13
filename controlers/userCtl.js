const mongoose = require("mongoose")

const asyncHandler = require("express-async-handler")

const User = require("../models/dbModel")


const {User1, User2 } = User

const createUserOne = asyncHandler(async (req, res) => {
    const { name, amount } = req.body
    try {
        if (name && amount) {
            const user = await User1.create({
                name: req.body.name,
                amount: req.body.amount,
            })
            user && res.json(user)
        } else {
            res.status(400)
            res.json({
                error: "Please fill all the fields",
            })
        }
    } catch (error) {
        throw new Error(error.message)
    }
    }
    
)


const createUserTwo = asyncHandler(async (req, res) => {
    const { name, amount } = req.body
    try {
        if (name && amount) {
            const user = await User2.create({
                name: req.body.name,
                amount: req.body.amount,
            })
            user && res.json(user)
        } else {
            res.status(400)
            res.json({
                error: "Please fill all the fields",
            })
        }
    } catch (error) {
        throw new Error(error.message)
    }
    }
    
)

const creditUser2AndDebitUserOne = asyncHandler(async (req, res) => { 
    // invoking session from mongoose
    const session = await mongoose.startSession()
    const { userOneName, userTwoName } = req.body
    console.log(req.body)
    // starting transaction using session
    session.startTransaction()
    const options = {
        session: session,
        new: true
    }
    try {
        const user1 = await User1.findOne({ name: userOneName },null, options)
       console.log(user1)
        user1.amount = parseFloat(user1.amount) - 200
        await user1.save()
        console.log(user1)
        const user2 = await User2.findOne({ name: userTwoName }, null, options)
        user2.amount = parseFloat(user2.amount) + 200
        console.log(user2)
        await user2.save()
        console.log(user2)
       
        // comiting the extire transaction as one
        await session.commitTransaction()
        session.endSession()
        res.json({
            success: true,
            user1, user2
        })
        
    } catch (error) {
        // aborting the transaction if  error occurs and also end the session
        session.endSession()
        throw new Error(error.message)
    }
    

})

module.exports = {
    createUserOne, createUserTwo, creditUser2AndDebitUserOne
}