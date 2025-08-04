import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma";

export class EventService {
    async getEventById(id: string) {
        return prisma.event.findUnique({ where: { id } });
    }

    async getEventsByGroupId(groupId: string) {
        return prisma.event.findMany({
            where: { groupId },
            orderBy: { startTime: "asc" },
        });
    }

    async createEvent(data: Prisma.EventCreateInput) {
        return prisma.event.create({ data });
    }

    async updateEvent(id: string, data: Partial<{ name: string; description?: string; date?: Date }>) {
        return prisma.event.update({ where: { id }, data });
    }

    async deleteEvent(id: string) {
        return prisma.event.delete({ where: { id } });
    }
}
