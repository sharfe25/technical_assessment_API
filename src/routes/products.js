const router = require('express').Router();
const pool = require("../database")

router.get('/clientList',async(req,res) => {
    const clients = await pool.query('SELECT client FROM clients ');
    let clients_name_list=[];
    clients.forEach(client =>{
        clients_name_list.push(client.client)
    })
    res.json({
        error: null,
        data: {
            title: 'list clients',
            clients: clients_name_list
        }
    })
})




module.exports = router