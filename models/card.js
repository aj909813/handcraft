const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
            quantity: { type: Number, default: 1 }
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
