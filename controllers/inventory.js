const Inventory = require("../models/inventory");
const EventLog = require("../models/eventLogs");
const mongoose = require("mongoose");

const getAllInventory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const inventory = await Inventory.find().skip(skip).limit(parseInt(limit));
    const totalItems = await Inventory.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    res
      .status(200)
      .json({ totalItems, totalPages, currentPage: page, inventory });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);

    await EventLog.create({
      action: "added",
      inventoryId: inventory._id,
    });
    res.status(201).json(inventory);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error creating inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid inventory ID format" });
    }

    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInventory = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    await EventLog.create({
      action: "updated",
      inventoryId: updatedInventory._id,
    });

    res.status(200).json(updatedInventory);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error updating inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    if (inventory.quantity > 0) {
      return res.status(400).json({
        error: "Cannot delete inventory with quantity greater than 0",
      });
    }
    await Inventory.findByIdAndDelete(req.params.id);

    await EventLog.create({
      action: "deleted",
      inventoryId: inventory._id,
    });
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllInventory,
  createInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};
