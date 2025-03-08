const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poojaSchema = new Schema({
    name:String,
    description:String,
    image:[String],
    material:String,
    shape:String,
    color:String,
    minimumorderquantity:Number,
    CountryofOrigin:String,
    type:String,
});

const Poojathali = mongoose.model("Poojathali",  poojaSchema);
module.exports = Poojathali;