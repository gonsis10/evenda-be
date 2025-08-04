import { Router } from "express";
import { createGroupMember, removeGroupMember, changeGroupMemberRole, listGroupMembers, isGroupMember } from "../controllers/groupMemberController";

export const groupMemberRouter = Router({ mergeParams: true });

groupMemberRouter.post("/", createGroupMember);
groupMemberRouter.delete("/:userId", removeGroupMember);
groupMemberRouter.put("/:userId/role", changeGroupMemberRole);
groupMemberRouter.get("/", listGroupMembers);
groupMemberRouter.get("/:userId/is-member", isGroupMember);
