import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroup,
  updateGroup,
} from "../controllers/groupController";
import authMiddleware from "../middleware/authMiddleware.js";

const route = Router();

route.use(authMiddleware);
route.post("/create", createGroup);
route.patch("/update", updateGroup);
route.get("/get", getGroup);
route.delete("delete", deleteGroup);

export default route;
