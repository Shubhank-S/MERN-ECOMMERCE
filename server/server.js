import express from "express";
import dotenv from "dotenv"

// Rest Object

const app =express();

// configure env

dotenv.config();

// PORT

const PORT = process.env.PORT ;

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
});