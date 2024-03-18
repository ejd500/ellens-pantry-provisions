const express = require('express');
// const uuid = require('uuid');

const router = express.Router();
const productsDal = require('../services/pg.products.dal.js')

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /products');
//   const theProducts = [
//       {product_id: '1', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '2', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '3', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '4', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//   ];
    try {
        let theProducts = await productsDal.getProducts(); 
        if(DEBUG) console.log(theProducts);
        res.render('products.ejs', {theProducts});
    } catch (err){
        if (DEBUG) console.log(err);
        res.render('error', { error: err});
    }
});

module.exports = router