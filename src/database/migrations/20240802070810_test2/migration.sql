/*
  Warnings:

  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `otp` table. All the data in the column will be lost.
  - The `id` column on the `otp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `otp` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_userId_fkey";

-- AlterTable
ALTER TABLE "otp" DROP CONSTRAINT "otp_pkey",
DROP COLUMN "userId",
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ADD CONSTRAINT "otp_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "username",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastName" TEXT,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
