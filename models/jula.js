const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const julaSchema = new Schema({
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

const Jula = mongoose.model("Jula", julaSchema);
module.exports = Jula;