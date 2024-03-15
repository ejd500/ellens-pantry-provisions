const express = require('express');
// const uuid = require('uuid');

const router = express.Router();
const productsDal = require('../services/pg.products.dal.js')

router.get('/', async (req, res) => {
//   const theProducts = [
//       {product_id: '1', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '2', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '3', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//       {product_id: '4', product_name: 'example', quantity_on_hand: 'example', wholesale_price: 'example', retail_price: 'example', profit: 'example'},
//   ];
  try {
        const success = req.query.success;
        let theProducts = await productsDal.getProducts(); 
        if(DEBUG) console.log(theProducts);
        res.render('management.ejs', {theProducts, success: success});
  } catch {
        res.render('503');
  }
});

router.get('/new-product', async (req, res) => {
      try { 
            if(DEBUG) console.log("add-new-product-page");
            res.render('new-product.ejs');
      } catch {
            res.render('503');
      }
    });

router.post('/new-product', async (req, res) => {
    if(DEBUG) console.log("posting-new-product");
    try {
        await productsDal.addProduct(req.body.product_id, req.body.product_name, req.body.quantity_on_hand, req.body.wholesale_price, req.body.retail_price);
        res.redirect('/management?success=Product added successfully!')
    } catch (err){
        if(DEBUG) console.log(err);
        // log this error to an error log file.
        res.render('error', { error: err.detail});
    } 
  });

module.exports = router