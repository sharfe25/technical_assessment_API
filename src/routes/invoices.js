const router = require('express').Router();
const pool = require("../database")

router.get('/invoicesList',async(req,res) => {
    console.log('hi')
    const invoices = await pool.query('SELECT invoices.id,clients.client,invoices.subtotal,invoices.discount,invoices.total FROM invoices,clients WHERE invoices.id_client=clients.id');

    res.json({
        error: null,
        data: {
            title: 'list invoices',
            invoices: invoices
        }
    })
})

router.post('/new_invoice',async(req,res) => {
    const {invoice_number,date,client,subtotal,discount,products,total} =req.body;
    const client_id= await pool.query('SELECT id FROM clients WHERE client=?',client);

    const invoice={
        id:invoice_number,
        id_client:client_id[0].id,
        date:date,
        subtotal:subtotal,
        discount:discount,
        total
    }
    
    const invoice_add=await pool.query('INSERT INTO invoices SET ?',invoice)
    products.forEach(async product=> {
        let product_invoice={
            id_invoice:invoice_number,
            id_product:product.id_product,
            quantity:product.quantity
        }
        console.log(product_invoice)
        let product_invoice_add = await pool.query('INSERT INTO invoices_products SET ?',[product_invoice])
    });
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            message: 'successful'
        }
    })
})


module.exports = router