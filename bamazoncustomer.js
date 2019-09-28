const mysql = require("mysql2/promise");
const cTable = require('console.table');

let connectionObject = {
    port: 3306,
    user: 'root',
    namedPlaceholders: true,
    password: 'mikeis31',
    database: "bamazon"
}

async function displayProducts() {
    const connection =  await mysql.createConnection(connectionObject);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //TODO: Move this later - we still need the connection for other operations
        connection.end();
    });
}

async function purchaseProduct(productId, purchaseQuanity) {
    let currentQuantity = await getCurrentQuanityofSpecifiedProduct(productId);
    if(currentQuantity < purchaseQuanity){
        console.log(`Insufficient stock, please try purchasing a lower amount than ${currentQuantity}`);
    }else{
        let newQuanity = currentQuantity-purchaseQuanity;
        await updateProduct(productId,newQuanity);
        let price = await getPriceofSpecifiedProduct(productId);
        let totalPrice = price*purchaseQuanity;
        console.log(`Your total today is $${totalPrice}`);
    }
}

async function updateProduct(productId, newQuanity) {
    const connection =  await mysql.createConnection(connectionObject);
    await connection.query(
        "UPDATE products SET ? WHERE ?", [{ stock_quanity: newQuanity }, { id: productId }],
    );
    await connection.end();
}

async function getCurrentQuanityofSpecifiedProduct(productId) {
    const connection = await mysql.createConnection(connectionObject);
    const [rows, fields] = await connection.query('SELECT stock_quanity from products where id = ?', [productId]);
    let currentQuantityPromise = rows[0].stock_quanity
    await connection.end();
    return currentQuantityPromise;
}

async function getPriceofSpecifiedProduct(productId) {
    const connection = await mysql.createConnection(connectionObject);
    const [rows, fields] = await connection.query('SELECT price from products where id = ?', [productId]);
    let pricePromise = rows[0].price
    await connection.end();
    return pricePromise;
}



//displayProducts();
//getCurrentQuanityofSpecifiedProduct(1).then(val => console.log("finished", val));
//updateProduct(1,300);
//purchaseProduct(1,100);