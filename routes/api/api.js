var router = require('express').Router();
const productsDal = require('../../services/pg.products.dal');

router.get('/', (req,res)=>{
    if(DEBUG) console.log('ROUTE: /api');
    res.render('api-home.ejs');
});

// api/products
router.get('/products', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api' + req.url);
    try {
        let theProducts = await productsDal.getProducts(); 
        res.json(theProducts);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.get('/products/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api' + req.url);
    try {
        let aProduct = await productsDal.getProductByProductId(req.params.id); 
        res.json(aProduct);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;