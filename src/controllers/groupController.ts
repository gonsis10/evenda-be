import { Request, Response } from "express";
import { GroupService } from "../services/groupService";
import { GroupMemberService } from "../services/groupMemberService";
import { GroupRole } from "../generated/prisma";

const groupService = new GroupService();
const groupMemberService = new GroupMemberService();

export const createGroup = async (req: Request, res: Response) => {
    const { name, description, createdBy } = req.body;
    try {
        // create group
        const group = await groupService.createGroup({
            name,
            description,
            createdBy: {
                connect: { id: createdBy },
            },
        });

        // create group member entry for the creator
        await groupMemberService.addMember(group.id, createdBy, GroupRole.OWNER);

        console.log(`Group created: ${group.id} by user ${createdBy}`);
        return res.status(201).json(group);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create group" });
    }
};

export const getGroup = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const group = await groupService.getGroupById(id);
        if (!group) return res.status(404).json({ error: "Group not found" });
        console.log(`Group retrieved: ${group.id}`);
        return res.json(group);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get group" });
    }
};

export const getAllPublicGroups = async (req: Request, res: Response) => {
    try {
        const groups = await groupService.getAllPublicGroups();
        console.log(`Retrieved ${groups.length} public groups`);
        return res.json(groups);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get groups" });
    }
};

export const updateGroup = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const group = await groupService.updateGroup(id, data);
        return res.json(group);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update group" });
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await groupService.deleteGroup(id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete group" });
    }
};
