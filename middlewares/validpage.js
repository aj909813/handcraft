const validCategories = ["murti", "dandiya", "poojathali", "bajyot", "jula"];
const models = {
    murti: require("../models/murti"),
    dandiya: require("../models/dandiya"),
    poojathali: require("../models/poojathali"),
    bajyot: require("../models/bajyot"),
    jula: require("../models/jula")
};

// Middleware to validate category
const validateCategory = (req, res, next) => {
    const name = req.params.name; 

    if (!validCategories.includes(name)) {
        req.flash("error", "Invalid Url");
        return res.redirect("/product"); 
    }

    req.model = models[name]; 
    req.categoryName = name;
    next(); 
};

module.exports = validateCategory;
