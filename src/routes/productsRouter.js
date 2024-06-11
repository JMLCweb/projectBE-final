const router = require("express").Router();
const productsController = require("../controllers/productsController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

router.use(auth.isAuthenticated);

router.post("/", checkRole("admin"), productsController.postProduct);
router.put("/:id", checkRole("admin"), productsController.putProductById);
router.delete("/:id", checkRole("admin"), productsController.deleteProductById);

module.exports = router;
