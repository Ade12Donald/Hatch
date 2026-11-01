import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
  updateProfilePicture,
  getProfilePicture,
  logOut,
} from "../controllers/userController.js";
import { validate } from "../middleware/validateSchema.js";
import { userSchema } from "../schema/userSchema.js";
import upload from "../middleware/upload.js";
import loginSchema from "../schema/loginSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const route = Router();

route.post("/create", validate(userSchema), createUser);
route.post("/login", validate(loginSchema), loginUser);
route.post("/logout", logOut);
route.use(authMiddleware);
route.get("/get", getUser);
route.patch("/update", validate(userSchema.partial()), updateUser);
route.delete("delete", deleteUser);
route.patch(
  "/profile-picture",
  upload.single("profilePicture"),
  updateProfilePicture,
);
route.get("/profile-picture", getProfilePicture);

export default route;
