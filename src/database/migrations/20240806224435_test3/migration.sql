/*
  Warnings:

  - Added the required column `requestsId` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `square-footage` on the `requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "requestsId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "square-footage",
ADD COLUMN     "square-footage" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_requestsId_fkey" FOREIGN KEY ("requestsId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
