const express=require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error")

app.use(express.json()); // middleware and alternative of body parser
app.use(cookieParser());

//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute')
app.use("/api/v1",product);
app.use("/api/v1",user);
//Middleware for error
app.use(errorMiddleware);

module.exports = app; // Modular programming so that other modules can access it.