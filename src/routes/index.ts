import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { userRouter } from "./users";
import { groupRouter } from "./groups";
import { groupMemberRouter } from "./groupMembers";
import { eventRouter } from "./events";

export const router = Router();

router.use(requireAuth);

router.use("/users", userRouter);
router.use("/groups", groupRouter);
router.use("/groups/:groupId/members", groupMemberRouter);
router.use("/events", eventRouter);
