const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//config
dotenv.config({path:"backend/config/config.env"});

//Connecting to the database
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
})