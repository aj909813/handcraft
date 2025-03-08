const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dandiyaSchema = new Schema({
    name:String,
    description:String,
    image:[String],
    material:String,
    shape:String,
    color:String,
    size:Number,
    minimumorderquantity:Number,
    CountryofOrigin:String,
    type:String,
});

const Dandiya = mongoose.model("Dandiya",  dandiyaSchema);
module.exports = Dandiya;