/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `agents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "agents_phone_key" ON "agents"("phone");
