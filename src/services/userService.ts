import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma";

export class UserService {
    async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async createUser(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }

    async updateUser(id: string, data: Partial<{ firstName: string; lastName: string }>) {
        return prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}
