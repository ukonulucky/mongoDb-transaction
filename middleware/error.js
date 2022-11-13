

const errorHandler = (error, req, res, next) => {
    statusCode = res.statusCode === 200 ? 500 : res.statusCode
   const errorMessage = {
       message: error.message,
       stack : process.env.NODE_ENV !== "production" ? error.stack : null
   }
  res.status(statusCode).json(errorMessage)
}
module.exports = errorHandler