const express = require("express")
const scoresRouter = require("./routes/scores")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/scores", scoresRouter)


//Serve Static Assets in production
//set static folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static((path.join(__dirname, '../public'))));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    });
  }

module.exports = app
