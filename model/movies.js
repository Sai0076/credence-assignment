const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    img:{
        type:String,
        required: true
    },

    summary:{
        type:String,
        required: true
    }
})


module.exports = mongoose.model('Movie',moviesSchema)