const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    required: true

  },

  products: [

    {

      productId: Number,

      quantity: Number

    }

  ],

  totalAmount: {

    type: Number,

    required: true

  },

  status: {

    type: String,

    default: "Pending"

  }

}, {

  timestamps: true

});

module.exports = mongoose.model(
  "Order",
  orderSchema
);