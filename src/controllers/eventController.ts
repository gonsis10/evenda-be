import { Request, Response } from "express";
import { EventService } from "../services/eventService";

const eventService = new EventService();

// export const createEvent = async (req: Request, res: Response) => {
//     const { title, description, location, startTime, endTime, groupId, createdBy } = req.body;
//     try {
//         const event = await eventService.createEvent({
//             title,
//             description,
//             location,
//             startTime: new Date(startTime),
//             endTime: endTime ? new Date(endTime) : undefined,
//             group: groupId,
//             createdBy,
//         });
//         console.log(`Event created: ${event.id} for group ${groupId}`);
//         return res.status(201).json(event);
//     } catch (err) {
//         console.error("Failed to create event:", err);
//         return res.status(500).json({ error: "Failed to create event" });
//     }
// };

export const getEvent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const event = await eventService.getEventById(id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        console.log(`Event retrieved: ${event.id}`);
        return res.json(event);
    } catch (err) {
        console.error("Failed to get event:", err);
        return res.status(500).json({ error: "Failed to get event" });
    }
};

export const getEventsByGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    try {
        const events = await eventService.getEventsByGroupId(groupId);
        console.log(`Retrieved ${events.length} events for group ${groupId}`);
        return res.json(events);
    } catch (err) {
        console.error("Failed to get events:", err);
        return res.status(500).json({ error: "Failed to get events" });
    }
};

// export const updateEvent = async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const { title, description, location, startTime, endTime } = req.body;
//     try {
//         const event = await eventService.updateEvent(id, {
//             title,
//             description,
//             location,
//             startTime: startTime ? new Date(startTime) : undefined,
//             endTime: endTime ? new Date(endTime) : undefined,
//         });
//         console.log(`Event updated: ${event.id}`);
//         return res.json(event);
//     } catch (err) {
//         console.error("Failed to update event:", err);
//         return res.status(500).json({ error: "Failed to update event" });
//     }
// };

export const deleteEvent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await eventService.deleteEvent(id);
        console.log(`Event deleted: ${id}`);
        return res.status(204).send();
    } catch (err) {
        console.error("Failed to delete event:", err);
        return res.status(500).json({ error: "Failed to delete event" });
    }
};
