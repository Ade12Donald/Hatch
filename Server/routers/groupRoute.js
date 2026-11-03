import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroup,
  updateGroup,
  usersGroup,
} from "../controllers/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import groupSchema from "../schema/groupSchema.js";
import { validate } from "../middleware/validateSchema.js";

const route = Router();

route.use(authMiddleware);
route.post("/create", validate(groupSchema), createGroup);
route.patch("/update", validate(groupSchema), updateGroup);
route.get("/get", getGroup);
route.get("/myGroups", usersGroup);
route.delete("delete", deleteGroup);

export default route;
