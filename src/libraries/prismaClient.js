import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUnique = async (table, ...args) => prisma[table].findUnique(...args);

export const findMany = async (table, ...args) => prisma[table].findMany(...args);

export const create = async (table, ...args) => prisma[table].create(...args);

export const createMany = async (table, ...args) => prisma[table].createMany(...args);

export const deleteSingleRecord = async (table, ...args) => prisma[table].delete(...args);

export const deleteMany = async (table, ...args) => prisma[table].deleteMany(...args);

export const upsert = async (table, ...args) => prisma[table].upsert(...args);

export const update = async (table, ...args) => prisma[table].update(...args);

export const disconnect = async () => prisma.$disconnect();
