const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const validateCategory = require("../middlewares/validpage.js"); 
const validateProduct = require("../middlewares/validateProduct");


const Murti = require("../models/murti.js");
const Jula = require("../models/jula.js");
const Dandiya = require("../models/dandiya.js");
const Bajyot = require("../models/bajyot.js");
const Poojathali = require("../models/poojathali.js");



router.get("/", async(req,res)=>{
    const allMurti = await Murti.find({}).limit(2);
    const allJula = await Jula.find({}).limit(2);
    const allPoojathali = await Poojathali.find({}).limit(2);
    const allBajyot = await Bajyot.find({}).limit(2);
    const allDandiya = await Dandiya.find({}).limit(2);

    res.render("Items/landingpage.ejs",{ allMurti,allJula, allPoojathali,allBajyot,allDandiya});
    
});



// search route
router.get("/search", async (req, res) => {
    let query = req.query.q;
    if (!query) {
      return res.send("Please provide a search query");
    }
  
    try {
      const [murtis, julas, dandiyas, poojaThalis,bajyots] = await Promise.all([
        Murti.find({ $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }] }),
        Jula.find({ $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }] }),
        Dandiya.find({ $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }] }),
        Poojathali.find({ $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }] }),
        Bajyot.find({ $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }] }),
    ]);
  
      let allItems = [...murtis, ...julas, ...dandiyas, ...poojaThalis, ...bajyots];
  
      console.log("Search Query:", query);
      console.log("Search Results:", allItems);
  
      res.render("items/search", { allItems, query });
    } catch (err) {
      console.log("Search Error:", err);
      res.status(500).send("Server Error");
    }
  });
  

  router.get("/call", (req, res) => {
    res.redirect('tel:+919828677190');
       });


// form 

router.post("/submit-form",async (req, res) => {
    const { fullname, phone, requirement } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({

        service: "gmail",
        secure:true,
        port:465,
        auth: {
            user:  "handcrafte04@gmail.com", // Your email
            pass: "vpyhwmynmtyfttdj"// Your email router password
        }
    });

    const mailOptions = {    
        from: "handcrafte04@gmail.com",
        to: "amanjosh019@gmail.com", // Change this to the owner's email
        subject: "New Inquiry from Website",
        text: `Name: ${fullname}\nPhone Number: ${phone}\nRequirement: ${requirement}`
    };

    try {
        await transporter.sendMail(mailOptions);
        req.flash("success","!The owner will contact you soon.");
        res.redirect("/product");
    } catch (error) {
        console.error(error);
        req.flash("error","sending email.Please try again.");
        res.redirect("/");
    }
});

//show route
router.get("/:type/:id", validateProduct,async (req, res) => {
    res.render("Items/show.ejs", { product: req.product });
});

// viewall second
router.get("/all", async (req, res) => {
    try {
        const allMurti = await Murti.find({});
        const allJula = await Jula.find({});
        const allPoojathali = await Poojathali.find({});
        const allBajyot = await Bajyot.find({});
        const allDandiya = await Dandiya.find({});

        res.render("Items/allproducts.ejs", {allMurti, allJula,allPoojathali, allBajyot, allDandiya});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

// card route

router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = { items: [] };
    }
    res.locals.cart = req.session.cart;
    next();
});


router.post("/cart/add/:type/:id", async (req, res) => {
    const { type, id } = req.params;
    let productModel;

    switch (type) {
        case "murti": productModel = Murti; break;
        case "jula": productModel = Jula; break;
        case "dandiya": productModel = Dandiya; break;
        case "bajyot": productModel = Bajyot; break;
        case "poojathali": productModel = Poojathali; break;
        default:
            req.flash("error", "Invalid product type");
            return res.redirect("/product");
    }

    try {
        const product = await productModel.findById(id);
        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/product");
        }

        let cart = req.session.cart;
        let itemIndex = cart.items.findIndex(item => item.productId.toString() === id);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId: product._id,
                name: product.name,
                description: product.description, // Added description
                image: product.image ? product.image[0] : "/default.jpg", // Added image
                quantity: 1
            });
        }

        req.flash("success", "Product added to cart");
        res.redirect("/product/cart");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        res.redirect("/product");
    }
});



router.get("/cart", (req, res) => {
    res.render("Items/cart.ejs", { cart: req.session.cart });
});



router.post("/cart/remove/:id", (req, res) => {
    const { id } = req.params;
    let cart = req.session.cart;

    cart.items = cart.items.filter(item => item.productId.toString() !== id);

    req.flash("success", "Item removed from cart");
    res.redirect("/product/cart");
});

// view all product route
router.get("/:name",validateCategory,async (req, res) => {
  
    try {
        const allProducts = await req.model.find(); // Fetch Products
        res.render("Items/murti.ejs", { name: req.categoryName, allProducts }); 
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;