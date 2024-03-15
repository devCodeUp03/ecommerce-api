const express = require('express');
const router = express.Router();
const {
    fetchProducts,
    postProduct,
    updateProduct,
    deleteProduct,
  } = require("../controller/product");
const { checkAuthentication } = require('../middleware/auth');
const seller = require('../middleware/seller');


router.get("", fetchProducts);
router.post("", checkAuthentication, seller, postProduct);
router.put("/:id", checkAuthentication, updateProduct);
router.delete("/:id", checkAuthentication, deleteProduct);

module.exports = router;