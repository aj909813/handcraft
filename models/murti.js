const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const murtiSchema = new Schema({
    name:String,
    description:String,
    image:[String],
    material:String,
    shape:String,
    color:String,
    size:Number,
    minimumorderquantity:Number,
    CountryofOrigin:String,
    Sutiablrfor:String,
    type:String,
});

const Murti = mongoose.model("Murti",  murtiSchema);
module.exports = Murti;