const router = require('express').Router();
const pool = require('../database');

const product_controller={}

product_controller.product_list=async(req,res) => {
    const products = await pool.query('SELECT description_product,price FROM products ');
    res.json({
        error: null,
        data: {
            title: 'list products',
            clients: products
        }
    })
}

module.exports = product_controller