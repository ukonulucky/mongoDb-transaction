const mongoose = require("mongoose")


const userSchema1 = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const User1 = mongoose.model("User1", userSchema1)

const userSchema2 = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const User2 = mongoose.model("User2", userSchema2)

module.exports = {
    User1,User2
}


  