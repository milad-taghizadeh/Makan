/*
  Warnings:

  - Added the required column `square-footage` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "square-footage" TEXT NOT NULL;
