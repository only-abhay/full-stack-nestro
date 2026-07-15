import express from "express";
import { Create, deletebyId, Read, UpdatebyId , ReadById , Allupdate } from "../controller/RoomType.js";

const RoomRouter = express.Router();

RoomRouter.post("/create",Create)
RoomRouter.put("/edit/:id" ,Allupdate)
RoomRouter.get("/get",Read)
RoomRouter.get("/get/:id",ReadById)
RoomRouter.patch("/update/:id",UpdatebyId)
RoomRouter.delete("/delete/:id",deletebyId)

export default RoomRouter