const express = require("express")
const scoresRouter = require("./routes/scores")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/scores", scoresRouter)


//Serve Static Assets in production
//set static folder
    app.use(express.static('public/'))

    app.get('*', (req, res) => {
      res.sendFile(__dirname +'/public/index.html');
    });
  

module.exports = app
