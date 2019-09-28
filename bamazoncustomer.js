const mysql = require("mysql2/promise");
const cTable = require('console.table');
const util = require('util');


// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "mikeis31",
//     database: "bamazon"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
// });

function displayProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //TODO: Move this later - we still need the connection for other operations
        connection.end();
    });
}

function purchaseProduct(productId, purchaseQuanity) {

}

async function updateProduct(productId, newQuanity) {
    console.log("Updating items...\n");
    await connection.query(
        "UPDATE products SET ? WHERE ?", [{stock_quanity: newQuanity},{id: productId}],
    );
}

async function getCurrentQuanity(productId) {
    const c = await mysql.createConnection({
        port: 3306,
        user: 'root',
        namedPlaceholders: true,
        password: 'mikeis31',
        database: "bamazon"
      });
      console.log('connected!');
      const [rows, fields] = await c.query('SELECT stock_quanity from products where id = ?',[productId]);
      let foo = rows[0].stock_quanity

      return foo;

    
}


getCurrentQuanity(1).then(val => console.log("finished", val));

