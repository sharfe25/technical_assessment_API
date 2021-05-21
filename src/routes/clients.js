const router = require('express').Router();
const pool = require("../database")
const clients=require("../controllers/client.controller")

router.get('/clientList',clients.client_list)


module.exports = router