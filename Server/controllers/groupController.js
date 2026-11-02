import mongoose from "mongoose";
import groupModel from "../models/groupModel";
import { AppError } from "../utils/errorHandling";

export const createGroup = async (req, res, next) => {
  try {
    const { name, bio, members } = req.body;
    const group = await groupModel.create({ name, bio, members });

    res.status(201).json({
      message: "Successful",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const { id: groupId } = req.params;
    const { name, bio, members } = req.body;

    if (!mongoose.isValidObjectId(groupId))
      throw new AppError("Invalid Id", 404);

    const group = await groupModel.findByIdAndUpdate(
      groupId,
      {
        name,
        bio,
        members,
      },
      { returnDocument: "after", runValidators: "true" },
    );

    if (!group) throw new AppError("Group Not Found", 404);

    res.status(200).json({
      message: "Successful",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};
