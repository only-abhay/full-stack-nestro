import express from "express";
import { Create, deletebyId, Read, UpdatebyId , ReadById , StatusUpdatebyid , AddImage} from "../controller/Product.controller.js";
import upload from "../middleware/multerUpload.js";
const router = express.Router()

router.post("/create" , upload.single("thumbnail"),Create)
router.get("/get",Read)
router.get("/get/:id",ReadById)
router.patch("/update/:id",UpdatebyId)
router.delete("/delete/:id",deletebyId)
router.put("/status/:id",StatusUpdatebyid)
router.post("/image/:id", upload.array("images", 4 ),AddImage)

export default router