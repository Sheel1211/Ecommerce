const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//Handling uncaught Exception  e.g:- console.log(youtube);
process.on("uncaughtException", (err)=>{
    console.log(`error :${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);
    
});

// console.log(youtube);

//config
dotenv.config({path:"backend/config/config.env"});

//Connecting to the database
connectDatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejection   (for server crashing)
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    })
});