const dal = require("./pg.thegrocerystore.db");

// Get all products
var getProducts = function() {
  if(DEBUG) console.log("pg.products.dal.getProducts()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT * FROM public.products ORDER BY quantity_on_hand DESC `
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

// Get product by product_id
var getProductByProductId = function(product_id) {
  if(DEBUG) console.log("pg.products.dal.getProductByProductId()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT product_id, product_name, quantity_on_hand, wholesale_price, retail_price, profit
    FROM public.products WHERE product_id = $1`;
    dal.query(sql, [product_id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

// INSERT / Add new product
var addProduct = function(product_id, product_name, quantity_on_hand, wholesale_price, retail_price) {
    if(DEBUG) console.log("pg.products.dal.addProduct()");
    return new Promise(function(resolve, reject) {
        const sql = `insert into public."products" (product_id, product_name, quantity_on_hand, wholesale_price, retail_price) values ($1, $2, $3, $4, $5)`;
        dal.query(sql, [product_id, product_name, quantity_on_hand, wholesale_price, retail_price], (err, result) => {
            if (err) {
                if(DEBUG) console.log("HELP");
                reject(err);
            } else {
                resolve(result.rows);
            }
        }); 
        });
  
};

// var patchLogin = function(id, username, password, email) {
//   if(DEBUG) console.log("logins.pg.dal.patchLogin()");
//   return new Promise(function(resolve, reject) {
//     const sql = `UPDATE public."Logins" SET username=$2, password=$3, email=$4 WHERE id=$1;`;
//     dal.query(sql, [id, username, password, email], (err, result) => {
//       if (err) {
//           reject(err);
//         } else {
//           resolve(result.rows);
//         }
//     }); 
//   });
// };

// DELETE product
var deleteProduct = function(product_id) {
  if(DEBUG) console.log("pg.products.dal.deleteProduct()");
  return new Promise(function(resolve, reject) {
    const sql = `DELETE FROM public."products" WHERE product_id = $1;`;
    dal.query(sql, [product_id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports = {
  getProducts,
  getProductByProductId,
  addProduct,
//   patchLogin,
  deleteProduct,
}