const express = require("express")
const scoresRouter = require("./routes/scores")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/scores", scoresRouter)

module.exports = app
