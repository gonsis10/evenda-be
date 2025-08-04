import { prisma } from "../config/prisma";
import { GroupRole } from "../generated/prisma";

export class GroupMemberService {
    async addMember(groupId: string, userId: string, role: GroupRole = GroupRole.MEMBER) {
        return prisma.groupMember.create({
            data: {
                groupId,
                userId,
                role,
            },
        });
    }

    async removeMember(groupId: string, userId: string) {
        return prisma.groupMember.delete({
            where: {
                userId_groupId: {
                    groupId,
                    userId,
                },
            },
        });
    }

    async changeRole(groupId: string, userId: string, role: GroupRole) {
        return prisma.groupMember.update({
            where: {
                userId_groupId: {
                    groupId,
                    userId,
                },
            },
            data: { role },
        });
    }

    async listGroupMembers(groupId: string) {
        return prisma.groupMember.findMany({
            where: { groupId },
            include: {
                user: true,
            },
        });
    }

    async isMember(groupId: string, userId: string) {
        const member = await prisma.groupMember.findUnique({
            where: {
                userId_groupId: {
                    groupId,
                    userId,
                },
            },
        });
        return !!member;
    }
}
