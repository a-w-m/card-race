const express = require('express')
const router = express.Router()
const {io} = ('../index')

router.get("/", (req, res)=>{

    console.log('test')
    res.json("hello")

})

module.exports = router;