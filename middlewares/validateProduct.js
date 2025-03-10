



const mongoose = require("mongoose");
const Murti = require("../models/murti");
const Jula = require("../models/jula");
const Dandiya = require("../models/dandiya");
const Bajyot = require("../models/bajyot");
const Poojathali = require("../models/poojathali");

// Define valid product categories
const validTypes = {
    murti: Murti,
    jula: Jula,
    dandiya: Dandiya,
    bajyot: Bajyot,
    poojathali: Poojathali
};


const validateProduct = async (req, res, next) => {
    const { type, id } = req.params;

    if (!validTypes[type]) {
        req.flash("error", "Page not found");
        return res.redirect("/product"); 
    }

    try {
        const model = validTypes[type]; 
        
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash("error", "Invalid product ID");
            return res.redirect("/product");
        }

        
        const product = await model.findById(id);
        if (!product) {
            req.flash("error", "Product not found!");
            return res.redirect("/product"); 
        }

        req.product = product; 
        next(); 
    } catch (err) {
        console.error("Error fetching product:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/product"); // Redirect on error
    }
};

module.exports = validateProduct;
