import groupModel from "../models/groupModel";

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
