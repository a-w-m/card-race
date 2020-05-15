const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//Create result schema
const scoreSchema = new Schema({
    name: String,
    time: Number,
    date: {type: Date, default: Date.now}
})


//Create result model 
const Score = mongoose.model('Score', scoreSchema)

module.exports = Score;