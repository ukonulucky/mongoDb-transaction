const express = require("express")
const asyncHandler = require("express-async-handler")
require("dotenv").config()

const dbConnect = require("./config")
const errorHandler = require("./middleware/error")
const { userRouter } = require("./routes/userRoutes")

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use("/api/user", userRouter)
app.use(errorHandler)



const connectServer = async() => {
  try {
      const db = await dbConnect()
    if (db) {
          app.listen(PORT, () => {
            console.log(`DB connected and server running on port ${PORT}`)
          })
          }
  } catch (error) {
      console.log(error.message)
      process.exit(1)
  }
}

connectServer()