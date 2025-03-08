const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.envPORT || 8080;

const path = require("path");
const engine = require("ejs-mate");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

const product = require("./routes/product.js");


const session = require("express-session");
const flash = require("connect-flash");
app.engine("ejs",engine);
app.use(express.static(path.join(__dirname,"/public")));

require("dotenv").config();

 const MONGO_URL = "mongodb://127.0.0.1:27017/Handcraft-products";


const sessionOptions = {
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
    await mongoose.connect(MONGO_URL);
}


app.use("/product",product);


//profile route
app.get("/profile", (req,res)=>{
    res.render("Items/profile.ejs");
});

// Handle invalid subroutes 
app.get("/profile/*", (req, res) => {
    req.flash("error", "Invalid url");
    res.redirect("/profile"); 
});


// middleware or (extra)
app.use((req, res, next) => {
    if (req.path.startsWith("/profile") && req.path !== "/profile") {
        req.flash("error", "Invalid profile Url");
        return res.redirect("/profile");
    }
    next();
});


// app.use((req, res, next) => {
//     if (req.path.startsWith("/product") && req.path !== "/product") {
//         req.flash("error", "Invalid url");
//         return res.redirect("/product");
//     }
//     next();
// });



// 404 Middleware - Handle Invalid Routes
app.use((req, res, next) => {
    res.status(404).send("404 - Page Not Found");
});


app.listen(8080,()=>{
    console.log(`The server is listining to port:${port}`);
});