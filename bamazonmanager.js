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

async function viewProductsForSale() {
    const connection = await mysql.createConnection(connectionObject);
    const [rows, fields] = await connection.query('SELECT * from products');
    console.table(rows);
    await connection.end();
}

async function viewLowInventory() {
    const connection = await mysql.createConnection(connectionObject);
    const [rows, fields] = await connection.query('SELECT * from products where stock_quanity < 5');
    console.table(rows);
    await connection.end();
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

async function updateInventory(productId, increaseQuanity) {
    let currentQuantity = await getCurrentQuanityofSpecifiedProduct(productId);
    let newQuanity = currentQuantity + increaseQuanity;
    await updateProduct(productId, newQuanity);
}

async function addNewProduct(name, department_name, price, stock_quanity) {
    const connection = await mysql.createConnection(connectionObject);
    await connection.query(
        "INSERT INTO products SET ?", [
        {
            product_name: name,
            department_name: department_name,
            price: price,
            stock_quanity: stock_quanity
        }],
    );
    await connection.end();
}

function initialize() {
    inquirer
        .prompt([{
            name: "managerChoice",
            type: "list",
            message: "Select the operation you would like to perform.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function (answer) {
            switch (answer.managerChoice) {
                case "View Products for Sale":
                    viewProductsForSale();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    inquirer.prompt([{
                        name: "productId",
                        type: "input",
                        message: "Please type the id of the product you'd like to add more inventory for"
                    },
                    {
                        name: "productQuantity",
                        type: "input",
                        message: "Please type the quantity to add"
                    }]).then(function (addAnswer) {
                        updateInventory(addAnswer.productId, parseInt(addAnswer.productQuantity));
                    })
                    break;
                case "Add New Product":
                    inquirer.prompt([
                        {
                            name: "productName",
                            type: "input",
                            message: "Name:"
                        },
                        {
                            name: "productDepartment",
                            type: "input",
                            message: "Department:"
                        },
                        {
                            name: "productPrice",
                            type: "input",
                            message: "Price:"
                        },
                        {
                            name: "productQuantity",
                            type: "input",
                            message: "Quantity:"
                        }
                    ]).then(function (newAnswer) {
                        addNewProduct(newAnswer.productName, newAnswer.productDepartment, newAnswer.productPrice, newAnswer.productPrice);
                    });
                    break;
            }
        });
}

initialize();