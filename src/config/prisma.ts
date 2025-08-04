import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

export { prisma };
