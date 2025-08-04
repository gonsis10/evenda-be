import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;
    try {
        const user = await userService.createUser({ email, firstName, lastName });
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create user" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get user" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: "Failed to get users" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    try {
        const user = await userService.updateUser(id, { firstName, lastName });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await userService.deleteUser(id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete user" });
    }
};
