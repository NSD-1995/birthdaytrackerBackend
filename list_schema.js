
const mongoose= require("mongoose")

let userSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    birthDate:Date,
    city:String,
    country:String
})

module.exports= mongoose.model('list',userSchema)