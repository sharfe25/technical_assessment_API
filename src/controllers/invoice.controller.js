const router = require('express').Router();
const pool = require('../database');

const invoice_controller={}

invoice_controller.invoice_list=async(req,res) => {
    const invoices = await pool.query('SELECT invoices.id,clients.client,invoices.subtotal,invoices.discount,invoices.total FROM invoices,clients WHERE invoices.id_client=clients.id');

    res.json({
        error: null,
        data: {
            title: 'list invoices',
            invoices: invoices
        }
    })
}
invoice_controller.new_invoice=async(req,res) => {
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
            id_product:product.id,
            quantity:parseInt(product.quantity)
        }
        let product_invoice_add = await pool.query('INSERT INTO invoices_products SET ?',[product_invoice])
    });
    res.json({
        error: null,
        data: {
            title: 'add new invoice',
            message: 'successful'
        }
    })
}
invoice_controller.individual_invoice=async(req,res) => {
    const invoice = await pool.query('SELECT invoices.id,clients.client,invoices.subtotal,invoices.discount,invoices.total,invoices.date FROM invoices,clients WHERE invoices.id_client=clients.id AND invoices.id=?',req.body.id);
    const products= await pool.query('SELECT invoices_products.quantity,products.description_product,products.price FROM products,invoices_products WHERE products.id=invoices_products.id_product AND invoices_products.id_invoice=?',req.body.id);
    
    res.json({
        error: null,
        data: {
            title: 'invoice',
            invoice: invoice[0],
            products
        }
    })
}
module.exports = invoice_controller