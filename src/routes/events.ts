import { Router } from "express";
import { getEvent, getEventsByGroup, deleteEvent } from "../controllers/eventController";

export const eventRouter = Router();

// eventRouter.post("/", createEvent);
eventRouter.get("/:id", getEvent);
eventRouter.get("/group/:groupId", getEventsByGroup);
// eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);
