import dotenv from "dotenv"
import ConnectDb from "./config/categoryDB.js";
import cors from "cors"
import express from "express";
import CategoryRouter from "./routers/Category.router.js"
dotenv.config()
const server = express()
server.use(cors({origin :  "http://localhost:3000"}))
server.use(express.json());
server.use("/category", CategoryRouter)


server.listen(process.env.PORT,()=>{
  ConnectDb()
    console.log(`Server is listening ${process.env.PORT}`)
})