const mysql = require("mysql2/promise");
const cTable = require('console.table');
const inquirer = require('inquirer');

let connectionObject = {
    port: 3306,
    user: 'root',
    namedPlaceholders: true,
    password: 'mikeis31',
    database: "bamazon"
}

async function displayProducts() {
    const connection = await mysql.createConnection(connectionObject);
    const [rows, fields] = await connection.query('SELECT id, product_name, price from products');
    console.table(rows);
    await connection.end();
}

async function purchaseProduct(productId, purchaseQuanity) {
    let currentQuantity = await getCurrentQuanityofSpecifiedProduct(productId);
    if (currentQuantity < purchaseQuanity) {
        console.log(`Insufficient stock, please try purchasing a lower amount than ${currentQuantity}`);
    } else {
        let newQuanity = currentQuantity - purchaseQuanity;
        await updateProduct(productId, newQuanity);
        let price = await getPriceofSpecifiedProduct(productId);
        let totalPrice = price * purchaseQuanity;
        console.log(`Your total today is $${totalPrice}`);
    }
}

async function updateProduct(productId, newQuanity) {
    const connection = await mysql.createConnection(connectionObject);
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

async function intialize() {
    inquirer
        .prompt([{
            name: "selectionId",
            type: "input",
            message: "Select the ID of the product you would like to purchase."
        },
        {
            name: "purchaseAmount",
            type: "input",
            message: "Please enter the number you'd like to purchase."
        }])
        .then(function (answer) {
            console.log(`You chose product ${answer.selectionId} and ${answer.purchaseAmount}`);
            purchaseProduct(answer.selectionId, answer.purchaseAmount);
        });
}

displayProducts().then(()=>{
    intialize()
});