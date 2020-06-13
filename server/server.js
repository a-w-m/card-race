const mongoose = require('mongoose')
const {server} = require('./index')
const dotenv = require('dotenv').config()
const socketListener = require('./socket')



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err=>{

    if (err){
        console.log("Error" + err)
    }
    else{
        
        server.listen(process.env.PORT, ()=>{
        console.log(`Your server is listening at http://localhost:${process.env.PORT}`);

    })

    }

    socketListener;
})

  