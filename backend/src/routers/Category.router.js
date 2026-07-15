import express from "express";
import { Create, deletebyId, Read, UpdatebyId , ReadById , Allupdate } from "../controller/Category.controller.js";
import upload from "../middleware/multerUpload.js";
const router = express.Router()
router.post("/create" , upload.single("image"),Create)
router.put("/edit/:id" , upload.single("image"),Allupdate)
router.get("/get",Read)
router.get("/get/:id",ReadById)
router.patch("/update/:id",UpdatebyId)
router.delete("/delete/:id",deletebyId)

export default router