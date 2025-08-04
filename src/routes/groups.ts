import { Router } from "express";
import { createGroup, getGroup, getAllPublicGroups, updateGroup, deleteGroup } from "../controllers/groupController";

export const groupRouter = Router();

groupRouter.post("/", createGroup);
groupRouter.get("/:id", getGroup);
groupRouter.get("/", getAllPublicGroups);
groupRouter.put("/:id", updateGroup);
groupRouter.delete("/:id", deleteGroup);
