import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "{PATH} is required"],
  },
  lead: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    trim: true,
  },
  assistant: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    trim: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: [true, "{PATH} is required"],
    trim: true,
    validate: {
      validator: (arr) => arr.length >= 1,
      message: "At least one member is required.",
    },
  },
  bio: {
    type: String,
    maxlength: [250, "Bio cannot exceed 250 characters."],
  },
});

export default mongoose.model("Group", groupSchema);
