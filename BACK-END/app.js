// Loading the .env file configuration variables
require("dotenv-safe").config({ example: "./Configs/.env.example" });
const fs = require("fs");
const express = require("express");
const DatabaseController = require("./Controllers/DatabaseController");
const AuthController = require("./Controllers/AuthController");
const registerEndpoints = require('./Controllers/endpoints');

// Crating the express server app
const app = express();
// Adding the JSON body parser to the app
app.use(express.json());
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Creating the authentication controller
const auth = new AuthController();

// Loading the database configuration from the .json configuration file
const dbConfig = JSON.parse(fs.readFileSync("./Configs/Database.json"));
// Creating a database connection using the database controller
const dbConnection = new DatabaseController(dbConfig.host, dbConfig.port, dbConfig.user, dbConfig.password, dbConfig.defaultDatabase);

// Registering the endpoint handlers and on the express app and providing the database connection
registerEndpoints(app, dbConnection, auth);
// Connecting to the database server and starting the server
dbConnection.connect().then(() => {
    console.log("Database connection successfully established!");
    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
}).catch((error) => console.error("Could not connect to the database server!\nAn error happened while connecting to the database: ", error));