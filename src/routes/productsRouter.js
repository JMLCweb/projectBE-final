const router = require("express").Router();
const productsController = require("../controllers/productsController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");
const verifyId = require("../middleware/verifyId");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

router.use(auth.isAuthenticated);
router.post(
  "/favorites/:userId",
  verifyId.IdentifyUser,
  productsController.addProductToFavorites
);

router.post(
  "/reviews/:userId",
  verifyId.IdentifyUser,
  productsController.addProductReview
);

router.post("/add", checkRole("admin"), productsController.newProduct);
router.put("/update/:id", productsController.putProductById);

router.delete(
  "/delete/:id",
  checkRole("admin"),
  productsController.deleteProductById
);
router.delete(
  "/favorites/:userId",
  productsController.removeProductFromFavorites
);

module.exports = router;
