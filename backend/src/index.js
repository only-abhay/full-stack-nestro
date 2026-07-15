import dotenv from "dotenv"
import ConnectDb from "./config/categoryDB.js";
import cors from "cors"
import express from "express";
import CategoryRouter from "./routers/Category.router.js"
import RoomRouter from "./routers/RoomType.js"
import MaterialRouter from "./routers/Material.js";
import Productrouter from "./routers/Product.router.js";
import UserRouter from "./routers/user.router.js";
import cookieParser from "cookie-parser"
dotenv.config()
const server = express()
server.user(cookieParser())
server.use(cors({origin :  "http://localhost:3000" , credentials:true}))
server.use(express.json());
server.use("/category", CategoryRouter)
server.use("/room-type",RoomRouter)
server.use("/material",MaterialRouter)
server.use("/product",Productrouter)
server.use("/user",UserRouter)

server.listen(process.env.PORT,()=>{
  ConnectDb()
    console.log(`Server is listening ${process.env.PORT}`)
})