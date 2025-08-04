import { Router } from "express";
import { userRouter } from "./users";
import { groupRouter } from "./groups";
import { groupMemberRouter } from "./groupMembers";

export const router = Router();

router.use("/users", userRouter);
router.use("/groups", groupRouter);
router.use("/groups/:groupId/members", groupMemberRouter);
