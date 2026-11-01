import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { AppError } from "../utils/errorHandling.js";
import logger from "../utils/logger.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";
import { JWTsign } from "../utils/token.js";

export const createUser = async (req, res, next) => {
  try {
    const { skillToLearn, skillToTeach } = req.body;

    const teachTitle = skillToTeach.map((values) => values.title);
    const learnTitle = skillToLearn.map((values) => values.title);

    const dummyTeach = [...new Set(teachTitle)];
    const dummyLearn = [...new Set(learnTitle)];

    for (const elements of skillToLearn) {
      if (teachTitle.includes(elements.title)) {
        throw new AppError("You can't want to learn what you can teach", 400);
      }
    }

    if (teachTitle.length !== dummyTeach.length)
      throw new AppError("You can't have duplicate skill", 400);

    if (learnTitle.length !== dummyLearn.length)
      throw new AppError("You can't have duplicate skill", 400);

    const user = await userModel.create(req.body);

    JWTsign(user, res);

    logger.info("User registered successfully", { userId: String(user._id) });
    res.status(201).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email }).select("+password");

    if (!userExist) throw new AppError("User not Found", 404);

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) throw new AppError("Invalid email or password", 400);

    JWTsign(userExist, res);

    res.status(200).json({
      status: "successful",
      message: "Welcome back",
      data: userExist,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { ID: id } = req.user;

    const user = await userModel.findById(id);

    if (!user) throw new AppError("User not Found", 404);

    res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { ID: id } = req.user;
    const {
      firstName,
      lastName,
      age,
      email,
      password,
      skillToLearn,
      skillToTeach,
    } = req.body;

    if (skillToLearn || skillToTeach) {
      const teachTitle = skillToTeach.map((values) => values.title);
      const learnTitle = skillToLearn.map((values) => values.title);

      const dummyTeach = [...new Set(teachTitle)];
      const dummyLearn = [...new Set(learnTitle)];

      for (const elements of skillToLearn) {
        if (teachTitle.includes(elements.title)) {
          throw new AppError("You can't want to learn what you can teach", 400);
        }
      }

      if (teachTitle.length != dummyTeach.length)
        throw new AppError("You can't have duplicate skills", 400);

      if (learnTitle.length != dummyLearn.length)
        throw new AppError("You can't have duplicate skills", 400);
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        age,
        email,
        skillToLearn,
        skillToTeach,
      },
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    if (!user) throw new AppError("User Not Found", 404);

    if (password) {
      user.password = password;
      await user.save();
    }
    res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) throw new AppError("User Not Found", 404);

    res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    const { ID: userId } = req.user;
    if (!req.file) throw new AppError("Please Upload an Image", 400);

    const userExist = await userModel.findById(userId);

    if (!userExist) throw new AppError("User Not Found", 404);

    const result = await uploadToCloudinary(req.file.buffer);
    const oldPublicId = userExist.profilePicture?.publicId;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profilePicture.url": result.secure_url,
          "profilePicture.publicId": result.public_id,
        },
      },
      { returnDocument: "after" },
    );

    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (error) {
        console.log("Old Image Detection failed: ", error);
      }
    }
    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getProfilePicture = async (req, res, next) => {
  try {
    const { ID: userId } = req.user;
    const userData = await userModel.findById(userId).select("profilePicture");
    if (!userData) throw new AppError("User Not Found", 404);

    res.status(200).json({
      message: "Profile picture fetched successfully",
      profilePicture: userData.profilePicture?.url ?? null,
    });
  } catch (error) {
    next(error);
  }
};
