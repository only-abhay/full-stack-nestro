import express from "express";
import { Create, deletebyId, Read, UpdatebyId , ReadById , Allupdate } from "../controller/Material.js";

const MaterialRouter = express.Router();

MaterialRouter.post("/create",Create)
MaterialRouter.put("/edit/:id" ,Allupdate)
MaterialRouter.get("/get",Read)
MaterialRouter.get("/get/:id",ReadById)
MaterialRouter.patch("/update/:id",UpdatebyId)
MaterialRouter.delete("/delete/:id",deletebyId)

export default MaterialRouter