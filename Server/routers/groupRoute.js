import { Router } from "express";
import { createGroup } from "../controllers/groupController";
import authMiddleware from "../middleware/authMiddleware.js";

const route = Router();

route.use(authMiddleware);
route.post("/create", createGroup);
route.post("/login");
route.get("/get");
route.patch("/update");
route.delete("delete");

export default route;
