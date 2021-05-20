const router = require('express').Router();
const pool = require("../database")
const products_list=require("../controllers/product.controller")

router.get('/productList', products_list.product_list)


module.exports = router