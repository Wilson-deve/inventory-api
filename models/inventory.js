const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const model = mongoose.model("Inventory");
        const count = await model.countDocuments({ name: value });
        return count === 0;
      },
      message: (props) =>
        `A product with the name '${props.value}' already exists. Please choose a unique name.`,
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Quantity must be greater than or equal to 0",
    },
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    // enum: {
    //   values: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
    //   message: '{VALUE} is not a valid category'
    // }
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
