const router = require('express').Router();
const pool = require("../database")
const invoices=require("../controllers/invoice.controller")

router.get('/invoicesList',invoices.invoice_list)

router.post('/new_invoice', invoices.new_invoice)

router.post('/individual_invoice', invoices.individual_invoice)

module.exports = router