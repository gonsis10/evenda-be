import { Request, Response } from "express";
import { GroupMemberService } from "../services/groupMemberService";
import { GroupRole } from "../generated/prisma";

const groupMemberService = new GroupMemberService();

export const createGroupMember = async (req: Request, res: Response) => {
    const { userId, role } = req.body;
    const groupId = req.params.groupId;
    try {
        const member = await groupMemberService.addMember(groupId, userId, role || GroupRole.MEMBER);
        return res.status(201).json(member);
    } catch (err) {
        return res.status(500).json({ error: "Failed to add group member" });
    }
};

export const removeGroupMember = async (req: Request, res: Response) => {
    const { groupId, userId } = req.params;
    try {
        await groupMemberService.removeMember(groupId, userId);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ error: "Failed to remove group member" });
    }
};

export const changeGroupMemberRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    const { groupId, userId } = req.params;
    try {
        const member = await groupMemberService.changeRole(groupId, userId, role);
        return res.json(member);
    } catch (err) {
        return res.status(500).json({ error: "Failed to change group member role" });
    }
};

export const listGroupMembers = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    try {
        const members = await groupMemberService.listGroupMembers(groupId);
        return res.json(members);
    } catch (err) {
        return res.status(500).json({ error: "Failed to list group members" });
    }
};

export const isGroupMember = async (req: Request, res: Response) => {
    const { groupId, userId } = req.params;
    try {
        const isMember = await groupMemberService.isMember(groupId, userId);
        return res.json({ isMember });
    } catch (err) {
        return res.status(500).json({ error: "Failed to check group membership" });
    }
};
