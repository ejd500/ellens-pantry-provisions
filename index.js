const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    if(DEBUG) console.log('ROUTE: '+ req.url);
    res.render('index.ejs');
});


const productsRouter = require('./routes/products')
app.use('/products', productsRouter);

const managementRouter = require('./routes/management')
app.use('/management', managementRouter);

const apiRouter = require('./routes/api/api.js')
app.use('/api', apiRouter);


app.use((err, req, res, next) => {
    if (DEBUG) console.error(err);
    res.status(500).render('error', {error: err});
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});

