/*
  Warnings:

  - Added the required column `status` to the `agents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Agent_Status" AS ENUM ('DELETED', 'SUSPENDED', 'OK', 'NOT_VERIFIED');

-- AlterTable
ALTER TABLE "agents" ADD COLUMN     "status" "Agent_Status" NOT NULL;
