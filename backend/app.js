const express=require("express");
const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json()); // middleware and alternative of body parser

//Route imports
const product = require('./routes/productRoute');

app.use("/api/v1",product);

//Middleware for error
app.use(errorMiddleware);

module.exports = app; // Modular programming so that other modules can access it.