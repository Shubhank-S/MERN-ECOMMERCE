import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import colors from "colors"
import connectDB from "./config/db.js";
import UserRoutes from './routes/UserRoutes.js'

// Rest Object

const app =express();

// Middlewares

app.use(express.json())
app.use(morgan('dev'))

// Routes

app.use('/api/v1/auth',UserRoutes)

// configure env

dotenv.config();

// Database Configuration

connectDB();

// PORT

const PORT = process.env.PORT || 8080 ;

// Rest APIs

app.get("/",(req,resp)=>{
 resp.send("<h1>welcome to Eccomerce App</h1>")
})

// Running Port

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`.bgGreen.blue)
});