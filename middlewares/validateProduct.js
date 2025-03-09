




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

// Middleware to validate product type and ID
const validateProduct = async (req, res, next) => {
    const { type, id } = req.params;

    // Check if type exists in validTypes
    if (!validTypes[type]) {
        req.flash("error", "Page not found");
        return res.redirect("/product"); // Redirect if category is invalid
    }

    try {
        const model = validTypes[type]; // Get the correct model
        const product = await model.findById(id); // Find product by ID

        if (!product) {
            req.flash("error", "Product not found!");
            return res.redirect("/product"); // Redirect if product not found
        }

        req.product = product; // Attach product data to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error fetching product:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/product"); // Redirect on error
    }
};

module.exports = validateProduct;
