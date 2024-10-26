const mongoose = require("mongoose");
const inventory = require("./inventory");

const eventLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const EventLog = mongoose.model("EventLog", eventLogSchema);
module.exports = EventLog;
