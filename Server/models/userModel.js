import mongoose from "mongoose";
import bcrypt from "bcrypt";

const profileSchema = new mongoose.Schema({
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
});

const userSchema = new mongoose.Schema(
  {
    profilePicture: { type: profileSchema, default: () => ({}) },
    firstName: {
      type: String,
      trim: true,
      required: [true, "{PATH} is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "{PATH} is required"],
    },
    age: {
      type: Number,
      min: [11, "{PATH} should be more than 11 yrs old"],
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "{PATH} is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "{PATH} is required"],
      select: false,
    },
    skillToLearn: [
      {
        title: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, "{PATH} is required"],
        },
        level: {
          type: String,
          enum: {
            values: ["intermediate", "expert"],
            message: "{PATH} must be intermediate or expert",
          },
          trim: true,
          lowercase: true,
          required: [true, "{PATH} is required"],
        },
      },
    ],
    skillToTeach: [
      {
        title: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, "{PATH} is required"],
        },
        level: {
          type: String,
          enum: {
            values: ["beginner", "intermediate", "expert"],
            message: "{PATH} must be beginner, intermediate or expert",
          },
          trim: true,
          lowercase: true,
          required: [true, "{PATH} is required"],
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
