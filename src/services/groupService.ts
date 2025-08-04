import { prisma } from "../config/prisma";
import { Prisma, GroupVisibility } from "../generated/prisma";

export class GroupService {
    async getGroupById(id: string) {
        return prisma.group.findUnique({ where: { id } });
    }

    async getAllPublicGroups() {
        return prisma.group.findMany({
            where: { visibility: GroupVisibility.PUBLIC },
            orderBy: { createdAt: "desc" },
        });
    }

    async createGroup(data: Prisma.GroupCreateInput) {
        return prisma.group.create({ data });
    }

    async updateGroup(id: string, data: Partial<{ name: string; description?: string; visibility?: GroupVisibility }>) {
        return prisma.group.update({ where: { id }, data });
    }

    async deleteGroup(id: string) {
        return prisma.group.delete({ where: { id } });
    }
}
