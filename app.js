const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8080;

const path = require("path");
const engine = require("ejs-mate");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

const product = require("./routes/product.js");


const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
app.engine("ejs",engine);
app.use(express.static(path.join(__dirname,"/public")));

require("dotenv").config();

 const dburl = process.env.MONGO_URL;

 const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SESSION_SECERT
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
    store,
    secret:process.env.SESSION_SECERT,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000, 
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};



app.use(session(sessionOptions));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error= req.flash("error");
    
    next();
});


main().then((res) => {
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dburl);
}

app.use("/product",product);

app.get("/",(req,res) => {
    res.redirect("/product");
});
app.get("*/",(req,res)=>{
  res.redirect("/product");
});


app.use((req, res, next) => {
    if (req.path.startsWith("/product") && req.path !== "/product") {
        req.flash("error", "404 Page not found");
        return res.redirect("/product");
    }
    next();
});





app.listen(8080,()=>{
    console.log(`The server is listining to port:${port}`);
});