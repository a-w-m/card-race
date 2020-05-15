const express = require('express');
const router = express.Router();
const Score = require ('../models/score');

router.get('/', (req, res)=>{

    Score.find().then(scores=>{

        res.json(scores)
    })
})


router.post('/', (req, res)=>{
    const {name, time} = req.body
    const newScore = new Score({name, time})
    newScore.save()
    
})
module.exports = router