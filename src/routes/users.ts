import { Router } from "express";
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/:id", getUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
