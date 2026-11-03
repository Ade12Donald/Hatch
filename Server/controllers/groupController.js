import mongoose from "mongoose";
import groupModel from "../models/groupModel.js";
import { AppError } from "../utils/errorHandling.js";

export const createGroup = async (req, res, next) => {
  try {
    const { ID: userId } = req.user;
    const { name, bio, members } = req.body;
    const group = await groupModel.create({ name, bio, members, lead: userId });

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
    const { ID: userId } = req.user;
    const { id: groupId } = req.params;
    const { name, bio, members } = req.body;

    if (!mongoose.isValidObjectId(groupId))
      throw new AppError("Invalid Id", 404);

    const groupExist = await groupModel.findById(groupId);
    if (!groupExist) throw new AppError("Group Not Found", 404);

    const isLead = groupExist.lead.some(
      (id) => id.toString() === userId.toString(),
    );

    if (!isLead) throw new AppError("Not Authorized", 403);
    const group = await groupModel.findByIdAndUpdate(
      groupId,
      {
        name,
        bio,
        members,
      },
      { returnDocument: "after", runValidators: "true" },
    );

    res.status(200).json({
      message: "Successful",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { ID: userId } = req.user;
    const { id: groupId } = req.params;

    const groupExist = await groupModel.findById(groupId);
    if (!groupExist) throw new AppError("Group Not Found", 404);
    if (groupExist.lead.toString() !== userId.ID.toString())
      throw new AppError("Not Authorized", 403);

    await groupExist.deleteOne();

    if (!mongoose.isValidObjectId(groupId))
      throw new AppError("Invalid Id", 404);

    const group = await groupModel.findByIdAndDelete(groupId);

    if (!group) throw new AppError("Group Not Found", 404);

    res.status(200).json({
      message: "Successful",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const { id: groupId } = req.params;

    if (!mongoose.isValidObjectId(groupId))
      throw new AppError("Invalid Id", 404);

    const group = await groupModel.findById(groupId);

    if (!group) throw new AppError("Group Not Found", 404);

    res.status(200).json({
      message: "Successful",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const usersGroup = async (req, res, next) => {
  try {
    const { ID: userId } = req.user;

    const myGroups = await groupModel
      .find({ members: userId })
      .select("name bio members lead assistant")
      .populate("members", "lead", "assistant")
      .lean();
    if (!myGroups) throw new AppError("No Group Found", 404);

    return res.status(200).json({
      status: "Successful",
      data: myGroups,
    });
  } catch (error) {
    next(error);
  }
};
