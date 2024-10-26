const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  createInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventory");

router.route("/").get(getAllInventory).post(createInventory);
router
  .route("/:id")
  .get(getInventoryById)
  .patch(updateInventory)
  .delete(deleteInventory);

module.exports = router;
