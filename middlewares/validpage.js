const validCategories = ["murti", "dandiya", "poojathali", "bajyot", "jula"];
const models = {
    murti: require("../models/murti"),
    dandiya: require("../models/dandiya"),
    poojathali: require("../models/poojathali"),
    bajyot: require("../models/bajyot"),
    jula: require("../models/jula")
};

// Middleware to validate category and attach model
const validateCategory = (req, res, next) => {
    const name = req.params.name?.toLowerCase(); // Get category name

    if (!validCategories.includes(name)) {
        req.flash("error", "Invalid Url");
        return res.redirect("/product"); // Redirect to products page
    }

    req.model = models[name]; // Attach the correct model to request object
    req.categoryName = name; // Attach category name
    next(); // Continue to the next middleware or route handler
};

module.exports = validateCategory;
