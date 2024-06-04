const router = require("express").Router();
const productsController = require("../controllers/productsController");
const auth = require("../middleware/auth");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

router.use(auth.isAuthenticated);
router.use(auth.isAdmin);

router.post("/", productsController.postProduct);
router.put("/:id", productsController.putProductById);
router.delete("/:id", productsController.deleteProductById);

module.exports = router;
