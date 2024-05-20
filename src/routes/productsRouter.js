const router = require("express").Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.postProduct);
router.put("/:id", productsController.putProductById);
router.delete("/:id", productsController.deleteProductById);

module.exports = router;
