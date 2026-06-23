import express from "express";
import { Create, deletebyId, Read, UpdatebyId } from "../controller/Category.controller.js";

const router = express.Router()
router.post("/create",Create)
router.get("/get",Read)
router.patch("/update/:id",UpdatebyId)
router.delete("/delete/:id",deletebyId)

export default router