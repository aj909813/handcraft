const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bajyotSchema = new Schema({
    name:String,
    description:String,
    image:[String],
    material:String,
    color:String,
    minimumorderquantity:Number,
    CountryofOrigin:String,
    Sutiablrfor:String,
    type:String,

});

const Bajyot = mongoose.model("Bajyot",  bajyotSchema);
module.exports = Bajyot;