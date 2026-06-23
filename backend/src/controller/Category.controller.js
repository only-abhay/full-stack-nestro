import CategoryModel from "../models/category.model.js";
import {
  AlreadyExist,
  Created,
  InternalServerError,
  NotFound,
} from "../utils/response.js";

const Create = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const category = await CategoryModel.findOne({ name: name });
    if (category) {
      return AlreadyExist(res, "Category Already Exist");
    }
    const categories = await CategoryModel.create({
      name: name,
      slug: slug,
    });
   return Created(res, "category Created");
  } catch (error) {
    return InternalServerError(res, error);
  }
};
const Read = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({
      messege: "Data Fetched",
      success: true,
      categories,
    });
  } catch (error) {
    return InternalServerError(res, "internal server error", error);
  }
};
const UpdatebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById({ _id: id });
    if (!category) {
      return NotFound(res, "Category Not found");
    }
    const NewCategory = await CategoryModel.findByIdAndUpdate(id, {
      status: !category.status,
    });

    res.status(200).json({
      messege: "Status Updated",
      success: true,
      NewCategory,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};
const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById({ _id: id });
    if (!category) {
      return NotFound(res, "Category Not found");
    }
    await CategoryModel.findByIdAndDelete(id);
    return Created(res, "Category Deleted");
  } catch (error) {
    return InternalServerError(res, "internal server error", error);
  }
};

export { Create, Read, deletebyId, UpdatebyId };
