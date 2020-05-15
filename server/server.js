const mongoose = require('mongoose')
const app = require('./index')
const dotenv = require('dotenv').config()



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err=>{

    if (err){
        console.log("Error" + err)
    }
    else{
        
        app.listen(process.env.PORT, ()=>{
        console.log(`Your server is listening at http://localhost:${process.env.PORT}`);
    })

    }

})

  