const mongoose = require("mongoose");
const MurtiData = require("./murtidata.js");
const JulaData = require("./juladata.js");
const PoojathaliData = require("./poojathalidata.js");
const BajyotData = require("./bajyotdata.js");
const DandiyaData = require("./dandiyadata.js");

const Murti = require("../models/murti.js");
const Jula = require("../models/jula.js");
const Dandiya = require("../models/dandiya.js");
const Bajyot = require("../models/bajyot.js");
const Poojathali = require("../models/poojathali.js");

const dburl = "mongodb+srv://aj909813:O12RpateTqPa9Uqx@cluster0.egipv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main().then((res)=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dburl);
}

const initDB = async() => {
    await Murti.deleteMany({});
    await Jula.deleteMany({});
    await Dandiya.deleteMany({});
    await Bajyot.deleteMany({});
    await Poojathali.deleteMany({});

    await Murti.insertMany(MurtiData);
    await Jula.insertMany(JulaData);
    await Poojathali.insertMany(PoojathaliData);
    await Bajyot.insertMany(BajyotData);
    await Dandiya.insertMany(DandiyaData);
    console.log("data was initialized");
}
initDB();