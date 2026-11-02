import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroup,
  updateGroup,
} from "../controllers/groupController";
import authMiddleware from "../middleware/authMiddleware.js";
import groupSchema from "../schema/groupSchema.js";
import { validate } from "../middleware/validateSchema.js";

const route = Router();

route.use(authMiddleware);
route.post("/create", validate(groupSchema), createGroup);
route.patch("/update", validate(groupSchema), updateGroup);
route.get("/get", getGroup);
route.delete("delete", deleteGroup);

export default route;
