const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const Score = require("../models/score")

router.get("/", (req, res, next) => {
  Score.find().then(scores => {
    res.json(scores)
  })
})

router.post(
  "/",
  check("name")
    .notEmpty()
    .isLength({ min: 3, max: 9 }),
  check("time").isInt({ gt: 0 }),
  (req, res) => {
    const { name, time } = req.body
    const newScore = new Score({ name, time })
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(errors)
    }

    newScore.save()
    return res.status(200).json("success")
  }
)
module.exports = router
