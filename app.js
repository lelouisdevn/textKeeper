const express = require("express")
const cors = require("cors")

const mainRouter = require("./app/routes/route")

const ApiError = require("./app/apiError")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/home", mainRouter)

// app.get("/", (req, res) => {
//     res.json({message: "Welcome."});
// })

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    })
})

module.exports = app
